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
// 颜色控制条
export class GradientColorCalculator {
  private colorStops: ColorStop[];

  constructor() {
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
   * 根据颜色反向计算近似位置
   * @param color 要查找的颜色值
   * @param totalWidth 渐变条总宽度
   * @returns 估算的offsetX位置
   */
  public getPositionForColor(color: ColorInput, totalWidth: number): number {
    const targetColor = tinycolor(color);
    let minDistance = Infinity;
    let bestPosition = 0;

    // 在渐变条上采样多个点，寻找最接近的颜色
    const samplePoints = 100; // 采样点数
    for (let i = 0; i <= samplePoints; i++) {
      const position = i / samplePoints;
      const sampleColor = tinycolor(
        this.getColorAtPosition(position * totalWidth, totalWidth)
      );

      // 计算颜色距离（使用CIE94色差公式更准确，这里简化使用RGB距离）
      const distance = this.calculateColorDistance(targetColor, sampleColor);

      if (distance < minDistance) {
        minDistance = distance;
        bestPosition = position;
      }
    }

    return bestPosition * totalWidth;
  }

  /**
   * 计算两个颜色之间的距离（简化版）
   */
  private calculateColorDistance(
    color1: tinycolor.Instance,
    color2: tinycolor.Instance
  ): number {
    const rgb1 = color1.toRgb();
    const rgb2 = color2.toRgb();

    // 简单的RGB欧几里得距离
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );
  }

  /**
   * 更精确的颜色搜索算法（二分查找优化）
   */
  public getPrecisePositionForColor(
    color: ColorInput,
    totalWidth: number,
    precision = 0.001
  ): number {
    const targetColor = tinycolor(color);
    let left = 0;
    let right = 1;
    let bestPosition = 0.5;
    let minDistance = Infinity;

    // 二分查找直到达到所需精度
    while (right - left > precision) {
      const mid1 = left + (right - left) / 3;
      const mid2 = right - (right - left) / 3;

      const color1 = tinycolor(
        this.getColorAtPosition(mid1 * totalWidth, totalWidth)
      );
      const color2 = tinycolor(
        this.getColorAtPosition(mid2 * totalWidth, totalWidth)
      );

      const distance1 = this.calculateColorDistance(targetColor, color1);
      const distance2 = this.calculateColorDistance(targetColor, color2);

      if (distance1 < distance2) {
        right = mid2;
        if (distance1 < minDistance) {
          minDistance = distance1;
          bestPosition = mid1;
        }
      } else {
        left = mid1;
        if (distance2 < minDistance) {
          minDistance = distance2;
          bestPosition = mid2;
        }
      }
    }

    return bestPosition * totalWidth;
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

interface ColorPanelOptions {
  width: number;
  height: number;
  baseColor: string;
  saturationRange?: [number, number];
  lightnessRange?: [number, number];
}
interface Point {
  x: number;
  y: number;
}
// 颜色面板
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
    this.satRange = options.saturationRange || [0, 1];
    this.lightRange = options.lightnessRange || [0, 1];
  }

  /**
   * 根据颜色反向计算 offsetX 和 offsetY
   * @param color 目标颜色
   * @returns 可能的坐标位置数组（可能有多个解）
   */
  public getPositionsForColor(color: ColorInput): Point[] {
    const target = tinycolor(color);
    const targetHsl = target.toHsl();
    const baseHsl = this.baseColor.toHsl();

    // 由于色相固定，我们只需要处理饱和度和明度
    const positions: Point[] = [];

    // 计算饱和度对应的X位置
    const xPercent = this.reverseMapRange(
      targetHsl.s,
      this.satRange[0],
      this.satRange[1]
    );

    // 计算明度对应的Y位置（注意Y轴反向）
    const yPercent =
      1 -
      this.reverseMapRange(targetHsl.l, this.lightRange[0], this.lightRange[1]);

    // 返回计算结果
    return [
      {
        x: this.clamp(xPercent * this.width, 0, this.width),
        y: this.clamp(yPercent * this.height, 0, this.height),
      },
    ];
  }

  /**
   * 反向映射范围值到0-1
   */
  private reverseMapRange(value: number, min: number, max: number): number {
    if (max === min) return 0.5; // 避免除以零
    return this.clamp((value - min) / (max - min), 0, 1);
  }

  /**
   * 查找所有可能产生该颜色的位置（高精度搜索）
   */
  public findAllPositionsForColor(
    color: ColorInput,
    precision: number = 100
  ): Point[] {
    const target = tinycolor(color);
    const positions: Point[] = [];
    const stepX = this.width / precision;
    const stepY = this.height / precision;

    for (let x = 0; x <= precision; x++) {
      for (let y = 0; y <= precision; y++) {
        const offsetX = x * stepX;
        const offsetY = y * stepY;
        const sample = tinycolor(this.calculateColor(offsetX, offsetY));

        if (this.colorsAreSimilar(target, sample, 5)) {
          positions.push({ x: offsetX, y: offsetY });
        }
      }
    }

    return positions;
  }

  /**
   * 判断两个颜色是否相似
   */
  private colorsAreSimilar(
    a: Instance,
    b: Instance,
    threshold: number
  ): boolean {
    const deltaR = a.toRgb().r - b.toRgb().r;
    const deltaG = a.toRgb().g - b.toRgb().g;
    const deltaB = a.toRgb().b - b.toRgb().b;
    return (
      Math.sqrt(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB) < threshold
    );
  }

  // 保留原有的方法...
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

  private mapRange(value: number, min: number, max: number): number {
    return min + (max - min) * value;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  public updateBaseColor(newColor: string): void {
    this.baseColor = tinycolor(newColor);
  }

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
