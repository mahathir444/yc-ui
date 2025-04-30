<template>
  <div
    class="yc-image"
    :style="{
      width: width ? `${width}px` : '',
      height: height ? `${height}px` : '',
    }"
  >
    <!-- image -->
    <img
      :src="src"
      :title="title"
      :alt="alt ?? description"
      :style="{
        width: width ? `${width}px` : '',
        height: height ? `${height}px` : '',
        objectFit: fit,
      }"
      class="yc-image-img"
      @load="handleLoad"
      @error="handleError"
      @click="handleClick"
    />
    <!-- 图像预览 -->
    <image-preview
      v-model:visible="computedVisible"
      :src="src"
      v-bind="previewProps"
    />
    <!-- loading -->
    <div v-if="showLoader && loading" class="yc-image-overlay">
      <slot name="loader">
        <div class="yc-image-loader">
          <yc-spin :size="60" />
        </div>
      </slot>
    </div>
    <!-- error -->
    <div v-if="isError" class="yc-image-overlay">
      <slot name="error">
        <div class="yc-image-error">
          <slot name="error-icon">
            <div class="yc-image-error-icon">
              <icon-image-close :size="60" />
            </div>
          </slot>
          <div class="yc-image-error-alt">
            {{ alt ?? description }}
          </div>
        </div>
      </slot>
    </div>
    <!-- footer -->
    <div
      v-if="!hideFooter && (title || description || $slots.extra)"
      :class="[
        'yc-image-footer',
        footerPosition == 'inner'
          ? 'yc-image-footer-inner'
          : 'yc-image-footer-outer',
        footerClass,
      ]"
    >
      <div class="yc-image-footer-caption">
        <div class="yc-image-footer-caption-title" :title="title">
          {{ title }}
        </div>
        <div class="yc-image-footer-caption-description" :title="description">
          {{ description }}
        </div>
      </div>
      <div v-if="$slots.extra" class="yc-image-footer-extra">
        <slot name="extra" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { ImageProps, ImageEmits, ImageSlots } from './type';
import { useControlValue } from '@shared/hooks';
import { IconImageClose } from '@shared/icons';
import YcSpin from '@/components/Spin';
import ImagePreview from './ImagePreview.vue';
defineOptions({
  name: 'Image',
});
defineSlots<ImageSlots>();
const props = withDefaults(defineProps<ImageProps>(), {
  src: '',
  title: '',
  description: '',
  hideFooter: false,
  footerPosition: 'inner',
  showLoader: false,
  preview: true,
  previewVisible: undefined,
  defaultPreviewVisible: false,
  previewProps: () => {
    return {};
  },
  footerClass: '',
});
const emits = defineEmits<ImageEmits>();
const { src, preview, previewVisible, defaultPreviewVisible } = toRefs(props);
// 图片预览可见性
const computedVisible = useControlValue<boolean>(
  previewVisible,
  defaultPreviewVisible.value,
  (val) => {
    emits('update:previewVisible', val);
    emits('preview-visible-change', val);
  }
);
// 是否错误
const isError = ref<boolean>(false);
// loading
const loading = ref<boolean>(false);
// 处理加载
const handleLoad = () => {
  loading.value = false;
  isError.value = false;
};
// 护理错误
const handleError = () => {
  loading.value = false;
  isError.value = true;
};
// 处理点击
const handleClick = () => {
  if (!preview.value) return;
  computedVisible.value = true;
  console.log('事件触发了');
};
watch(
  () => src.value,
  () => {
    loading.value = true;
    isError.value = false;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.yc-image {
  position: relative;
  display: inline-block;
  border-radius: 2px;
  .yc-image-img {
    vertical-align: middle;
    border-radius: inherit;
    border-style: none;
  }

  .yc-image-overlay {
    position: absolute;
    inset: 0 0 0 0;
    z-index: 11;
    .yc-image-error {
      width: 100%;
      height: 100%;
      color: rgb(201, 205, 212);
      background-color: rgb(247, 248, 250);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .yc-image-error-icon {
        width: 60px;
        height: 60px;
        max-width: 100%;
        max-height: 100%;
      }
      .yc-image-error-alt {
        padding: 8px 16px;
        font-size: 12px;
        line-height: 1.6667;
      }
    }
    .yc-image-loader {
      background-color: rgba(255, 255, 255, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .yc-image-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;

    gap: 12px;
    .yc-image-footer-caption {
      flex: 1;
      .yc-image-footer-caption-title {
        font-weight: 500;
        font-size: 16px;
      }
      .yc-image-footer-caption-description {
        font-size: 14px;
      }
    }
    .yc-image-footer-extra {
      flex-shrink: 0;
    }
  }
  .yc-image-footer-inner {
    padding: 9px 16px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    background: linear-gradient(
      360deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
    align-items: center;
  }
  .yc-image-footer-outer {
    margin-top: 4px;
    color: rgb(78, 89, 105);
    .yc-image-footer-caption {
      .yc-image-footer-caption-title {
        color: rgb(29, 33, 41);
      }
    }
  }
}
</style>
