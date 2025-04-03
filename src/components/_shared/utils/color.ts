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

interface Point {
  x: number;
  y: number;
}

interface GradientStop {
  pos: number;
  color: ColorInput;
}

export class AdvancedColorPicker {
  private width: number;
  private height: number;
  private baseColor: Instance;

  // 渐变配置
  private readonly verticalGradient: GradientStop[] = [
    { pos: 0, color: '#000000' }, // 底部黑色
    { pos: 1, color: 'transparent' }, // 顶部透明
  ];

  private readonly horizontalGradient: GradientStop[] = [
    { pos: 0, color: '#ffffff' }, // 左侧白色
    { pos: 1, color: 'rgba(255, 255, 255, 0)' }, // 右侧透明
  ];

  constructor(
    width: number,
    height: number,
    baseColor: ColorInput = '#3498db'
  ) {
    this.width = width;
    this.height = height;
    this.baseColor = tinycolor(baseColor);
  }

  /**
   * 获取指定位置的颜色
   * @param offsetX 水平偏移 (0-width)
   * @param offsetY 垂直偏移 (0-height)
   * @returns 十六进制或RGBA颜色字符串
   */
  public getColorAtPosition(offsetX: number, offsetY: number): string {
    const position = this.normalizePosition(offsetX, offsetY);
    const adjustedBase = this.adjustBaseColor(position.x, position.y);
    const verticalColor = this.getGradientColor(
      this.verticalGradient,
      position.y
    );
    const horizontalColor = this.getGradientColor(
      this.horizontalGradient,
      position.x
    );

    return this.blendThreeColors(adjustedBase, verticalColor, horizontalColor);
  }

  /**
   * 标准化坐标位置
   */
  private normalizePosition(offsetX: number, offsetY: number): Point {
    return {
      x: this.clamp(offsetX / this.width, 0, 1),
      y: this.clamp(offsetY / this.height, 0, 1),
    };
  }

  /**
   * 根据位置调整主色
   */
  private adjustBaseColor(xPos: number, yPos: number): Instance {
    const hsl = this.baseColor.clone().toHsl();

    // X轴控制饱和度变化
    hsl.s = xPos;

    // Y轴控制明度变化 (反向)
    hsl.l = 1 - yPos;

    // 对角线控制色相变化 (±30度)
    const hueVariation = (xPos + yPos - 1) * 60; // -60到+60
    hsl.h = (hsl.h + hueVariation + 360) % 360; // 确保在0-360范围内

    return tinycolor(hsl);
  }

  /**
   * 从渐变获取颜色
   */
  private getGradientColor(stops: GradientStop[], position: number): Instance {
    const { startStop, endStop } = this.findStops(stops, position);
    const range = endStop.pos - startStop.pos;
    const ratio = range > 0 ? (position - startStop.pos) / range : 0;

    return tinycolor.mix(
      tinycolor(startStop.color),
      tinycolor(endStop.color),
      ratio * 100
    );
  }

  /**
   * 查找相邻的渐变停止点
   */
  private findStops(
    stops: GradientStop[],
    position: number
  ): { startStop: GradientStop; endStop: GradientStop } {
    for (let i = 0; i < stops.length - 1; i++) {
      if (position >= stops[i].pos && position <= stops[i + 1].pos) {
        return {
          startStop: stops[i],
          endStop: stops[i + 1],
        };
      }
    }
    return {
      startStop: stops[0],
      endStop: stops[stops.length - 1],
    };
  }

  /**
   * 三源颜色混合
   */
  private blendThreeColors(
    base: Instance,
    vertical: Instance,
    horizontal: Instance
  ): string {
    // 1. 基础色与垂直渐变混合 (乘法)
    const baseMixed = this.multiplyBlend(base, vertical);

    // 2. 结果与水平渐变混合 (叠加)
    const finalColor = this.overlayBlend(baseMixed, horizontal);

    // 返回HEX8或RGBA格式
    return finalColor.getAlpha() === 1
      ? finalColor.toHexString()
      : finalColor.toHex8String();
  }

  /**
   * 乘法混合模式
   */
  private multiplyBlend(bottom: Instance, top: Instance): Instance {
    const b = bottom.toRgb();
    const t = top.toRgb();

    return tinycolor({
      r: (b.r * t.r) / 255,
      g: (b.g * t.g) / 255,
      b: (b.b * t.b) / 255,
      a: 1 - (1 - b.a) * (1 - t.a),
    });
  }

  /**
   * 叠加混合模式
   */
  private overlayBlend(bottom: Instance, top: Instance): Instance {
    const b = bottom.toRgb();
    const t = top.toRgb();

    const blendChannel = (b: number, t: number) => {
      return b < 128
        ? (2 * b * t) / 255
        : 255 - (2 * (255 - b) * (255 - t)) / 255;
    };

    return tinycolor({
      r: blendChannel(b.r, t.r),
      g: blendChannel(b.g, t.g),
      b: blendChannel(b.b, t.b),
      a: 1 - (1 - b.a) * (1 - t.a),
    });
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
  public updateBaseColor(color: ColorInput): void {
    this.baseColor = tinycolor(color);
  }

  /**
   * 根据颜色查找可能的位置
   */
  public getPositionsForColor(
    targetColor: ColorInput,
    precision: number = 10
  ): Point[] {
    const target = tinycolor(targetColor);
    const positions: Point[] = [];
    const stepX = this.width / precision;
    const stepY = this.height / precision;

    for (let x = 0; x <= precision; x++) {
      for (let y = 0; y <= precision; y++) {
        const offsetX = x * stepX;
        const offsetY = y * stepY;
        const sample = tinycolor(this.getColorAtPosition(offsetX, offsetY));

        if (this.colorsAreSimilar(target, sample, 5)) {
          positions.push({ x: offsetX, y: offsetY });
        }
      }
    }

    return positions;
  }

  /**
   * 判断颜色相似度
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
}
