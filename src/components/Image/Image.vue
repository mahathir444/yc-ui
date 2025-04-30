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
      v-if="preview"
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
@import './style/image';
</style>
