<template>
  <div class="yc-watermark" ref="containerRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue';
type WatermarkType = 'text' | 'image';
type RepeatMode = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
const props = defineProps({
  // 水印类型：文字或图片
  type: {
    type: String as () => WatermarkType,
    default: 'text',
    validator: (val: string) => ['text', 'image'].includes(val),
  },
  // 文字水印内容
  text: {
    type: String,
    default: 'Watermark',
  },
  // 图片水印URL
  imageUrl: {
    type: String,
    default: '',
  },
  // 文字颜色
  color: {
    type: String,
    default: 'rgba(0, 0, 0, 0.1)',
  },
  // 字体大小
  fontSize: {
    type: Number,
    default: 16,
  },
  // 字体家族
  fontFamily: {
    type: String,
    default: 'Arial, sans-serif',
  },
  // 旋转角度
  rotate: {
    type: Number,
    default: -20,
  },
  // 水平间距
  gapX: {
    type: Number,
    default: 100,
  },
  // 垂直间距
  gapY: {
    type: Number,
    default: 100,
  },
  // 是否启用水印
  enabled: {
    type: Boolean,
    default: true,
  },
  // 透明度 (0-1)
  opacity: {
    type: Number,
    default: 0.1,
    validator: (val: number) => val >= 0 && val <= 1,
  },
  // z-index 层级
  zIndex: {
    type: Number,
    default: 999,
  },
  // 重复模式
  repeat: {
    type: String as () => RepeatMode,
    default: 'repeat',
    validator: (val: string) =>
      ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].includes(val),
  },
  // 是否应用灰阶效果
  grayscale: {
    type: Boolean,
    default: false,
  },
  // 是否错开排列
  staggered: {
    type: Boolean,
    default: false,
  },
  // 错开排列的偏移量
  staggerOffset: {
    type: Number,
    default: 50,
  },
});
// ref
const containerRef = ref<HTMLElement | null>(null);
// canvas
const watermarkCanvas = ref<HTMLCanvasElement | null>(null);
// 创建水印背景图
const createWatermark = (): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve('');
      return;
    }

    // 设置canvas大小
    const size = props.staggered ? props.gapX * 2 : props.gapX;
    canvas.width = size;
    canvas.height = props.staggered ? props.gapY * 2 : props.gapY;

    // 设置全局透明度
    ctx.globalAlpha = props.opacity;

    if (props.type === 'text') {
      // 绘制文字水印
      ctx.font = `${props.fontSize}px ${props.fontFamily}`;
      ctx.fillStyle = props.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 绘制第一个水印
      ctx.save();
      ctx.translate(
        size / (props.staggered ? 4 : 2),
        props.gapY / (props.staggered ? 4 : 2)
      );
      ctx.rotate((Math.PI / 180) * props.rotate);
      ctx.fillText(props.text, 0, 0);
      ctx.restore();

      // 如果需要错开排列，绘制第二个水印
      if (props.staggered) {
        ctx.save();
        ctx.translate((size * 3) / 4, (props.gapY * 3) / 4);
        ctx.rotate((Math.PI / 180) * props.rotate);
        ctx.fillText(props.text, 0, 0);
        ctx.restore();
      }
    } else if (props.imageUrl) {
      // 绘制图片水印
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = props.imageUrl;

      img.onload = () => {
        // 计算缩放比例，使图片适应水印区域
        const scale =
          Math.min(props.gapX / img.width, props.gapY / img.height) * 0.8; // 保留一些边距

        const width = img.width * scale;
        const height = img.height * scale;

        // 绘制第一个图片水印
        ctx.save();
        ctx.translate(
          (props.staggered ? size / 4 : size / 2) - width / 2,
          (props.staggered ? props.gapY / 4 : props.gapY / 2) - height / 2
        );
        ctx.rotate((Math.PI / 180) * props.rotate);

        if (props.grayscale) {
          // 应用灰阶效果
          ctx.filter = 'grayscale(100%)';
        }

        ctx.drawImage(img, 0, 0, width, height);
        ctx.restore();

        // 如果需要错开排列，绘制第二个图片水印
        if (props.staggered) {
          ctx.save();
          ctx.translate(
            (size * 3) / 4 - width / 2,
            (props.gapY * 3) / 4 - height / 2
          );
          ctx.rotate((Math.PI / 180) * props.rotate);

          if (props.grayscale) {
            ctx.filter = 'grayscale(100%)';
          }

          ctx.drawImage(img, 0, 0, width, height);
          ctx.restore();
        }

        resolve(canvas.toDataURL('image/png'));
      };

      img.onerror = () => {
        console.error('Failed to load watermark image');
        resolve('');
      };

      return;
    }

    resolve(canvas.toDataURL('image/png'));
  });
};

// 应用水印样式
const applyWatermark = async () => {
  if (!containerRef.value) return;

  if (props.enabled) {
    const watermarkUrl = await createWatermark();
    if (watermarkUrl) {
      containerRef.value.style.position = 'relative';
      containerRef.value.style.zIndex = props.zIndex.toString();
      containerRef.value.style.backgroundImage = `url(${watermarkUrl})`;
      containerRef.value.style.backgroundRepeat = props.repeat;
      containerRef.value.style.backgroundSize = props.staggered
        ? `${props.gapX * 2}px ${props.gapY * 2}px`
        : `${props.gapX}px ${props.gapY}px`;
    }
  } else {
    containerRef.value.style.backgroundImage = 'none';
  }
};

// 监听props变化
watch(
  () => [
    props.type,
    props.text,
    props.imageUrl,
    props.color,
    props.fontSize,
    props.fontFamily,
    props.rotate,
    props.gapX,
    props.gapY,
    props.enabled,
    props.opacity,
    props.zIndex,
    props.repeat,
    props.grayscale,
    props.staggered,
    props.staggerOffset,
  ],
  () => {
    nextTick(() => {
      applyWatermark();
    });
  },
  { deep: true }
);

onMounted(() => {
  applyWatermark();
});
</script>

<style scoped>
@import './style/watermark.less';
</style>
