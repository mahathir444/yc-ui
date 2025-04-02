import tinycolor, { ColorInput, Instance } from 'tinycolor2';

// 定义颜色停止点类型
interface ColorStop {
  pos: number; // 位置 0-1
  color: ColorInput;
}

interface ColorPanelOptions {
  width: number;
  height: number;
  baseColor: string;
  saturationRange?: [number, number]; // [min, max]
  lightnessRange?: [number, number]; // [min, max]
}

export class GradientColorCalculator {
  private colorStops: ColorStop[];

  constructor() {
    // 初始化渐变颜色停止点
    this.colorStops = [
      { pos: 0, color: '#f00' },
      { pos: 0.17, color: '#ff0' },
      { pos: 0.33, color: '#0f0' },
      { pos: 0.5, color: '#0ff' },
      { pos: 0.67, color: '#00f' },
      { pos: 0.83, color: '#f0f' },
      { pos: 1, color: '#f00' },
    ];
  }

  /**
   * 根据位置获取渐变颜色
   * @param offsetX 当前位置距离左边的距离
   * @param totalWidth 渐变条总宽度
   * @returns 计算出的颜色值 (十六进制字符串)
   */
  public getColorAtPosition(offsetX: number, totalWidth: number): string {
    // 计算当前位置在渐变中的比例 (0-1)
    const position = this.clamp(offsetX / totalWidth, 0, 1);

    // 找到相邻的两个颜色停止点
    const { startStop, endStop } = this.findStops(position);

    // 计算在两个停止点之间的比例
    const range = endStop.pos - startStop.pos;
    const ratio = range > 0 ? (position - startStop.pos) / range : 0;

    // 使用tinycolor2混合颜色
    const startColor = tinycolor(startStop.color);
    const endColor = tinycolor(endStop.color);

    // 返回混合后的颜色
    return tinycolor.mix(startColor, endColor, ratio * 100).toHexString();
  }

  /**
   * 查找包含指定位置的颜色停止点
   * @param position 0-1之间的位置
   * @returns 包含相邻停止点的对象
   */
  private findStops(position: number): {
    startStop: ColorStop;
    endStop: ColorStop;
  } {
    for (let i = 0; i < this.colorStops.length - 1; i++) {
      if (
        position >= this.colorStops[i].pos &&
        position <= this.colorStops[i + 1].pos
      ) {
        return {
          startStop: this.colorStops[i],
          endStop: this.colorStops[i + 1],
        };
      }
    }

    // 默认返回第一个和最后一个停止点（理论上不会执行到这里）
    return {
      startStop: this.colorStops[0],
      endStop: this.colorStops[this.colorStops.length - 1],
    };
  }

  /**
   * 限制数值在最小最大值之间
   * @param value 输入值
   * @param min 最小值
   * @param max 最大值
   * @returns 限制后的值
   */
  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * 更新渐变颜色停止点
   * @param stops 新的颜色停止点数组
   */
  public updateColorStops(stops: ColorStop[]): void {
    // 验证停止点
    if (stops.length < 2) {
      throw new Error('至少需要两个颜色停止点');
    }
    if (stops[0].pos !== 0 || stops[stops.length - 1].pos !== 1) {
      throw new Error('第一个停止点位置必须为0，最后一个必须为1');
    }

    this.colorStops = stops.sort((a, b) => a.pos - b.pos);
  }
}

export class DynamicColorCalculator {
  private width: number;
  private height: number;
  private baseColor: Instance;
  private satRange: [number, number];
  private lightRange: [number, number];

  constructor(options: ColorPanelOptions) {
    this.width = options.width;
    this.height = options.height;
    this.baseColor = tinycolor(options.baseColor);

    // 设置默认饱和度范围 (0% - 100%)
    this.satRange = options.saturationRange || [0, 1];

    // 设置默认明度范围 (0% - 100%)
    this.lightRange = options.lightnessRange || [0, 1];
  }

  /**
   * 根据偏移量计算颜色
   * @param offsetX 水平偏移 (0 - width)
   * @param offsetY 垂直偏移 (0 - height)
   * @returns 计算后的颜色 (十六进制字符串)
   */
  public calculateColor(offsetX: number, offsetY: number): string {
    // 计算标准化位置 (0-1)
    const xPercent = this.clamp(offsetX / this.width, 0, 1);
    const yPercent = this.clamp(offsetY / this.height, 0, 1);
    // 获取主色的HSL值
    const hsl = this.baseColor.toHsl();
    // 根据偏移量计算新HSL值
    const newHsl = {
      h: hsl.h, // 保持色相不变
      s: this.mapRange(xPercent, ...this.satRange),
      l: this.mapRange(1 - yPercent, ...this.lightRange), // Y轴反向
      a: hsl.a, // 保持透明度
    };
    // 转换为HEX颜色
    return tinycolor(newHsl).toHexString();
  }

  /**
   * 将0-1的值映射到指定范围
   */
  private mapRange(value: number, min: number, max: number): number {
    return min + (max - min) * value;
  }

  /**
   * 限制数值范围
   */
  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * 更新主色
   */
  public updateBaseColor(newColor: string): void {
    this.baseColor = tinycolor(newColor);
  }

  /**
   * 获取当前配置
   */
  public getConfig() {
    return {
      baseColor: this.baseColor.toHexString(),
      width: this.width,
      height: this.height,
      saturationRange: this.satRange,
      lightnessRange: this.lightRange,
    };
  }
}
