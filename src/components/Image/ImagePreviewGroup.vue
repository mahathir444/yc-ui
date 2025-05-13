<template>
  <teleport :to="popupContainer">
    <div
      v-if="outerVisible"
      class="yc-image-preview"
      :style="{
        zIndex,
      }"
    >
      <transition name="fade">
        <div v-show="innerVisible" class="yc-image-preview-mask"></div>
      </transition>
      <!-- body -->
      <transition name="fade" @after-leave="handleAfterLeave">
        <div
          v-show="innerVisible"
          class="yc-image-preview-wrapper"
          @click.self="handleClose('mask', $event)"
        >
          <!-- img -->
          <div
            :style="{
              transform: `scale(${scale}, ${scale})`,
            }"
            class="yc-image-preview-img-container"
          >
            <img
              :src="src"
              :style="{
                transform: `translate(-50%,-50%) rotate(${rotate}deg)`,
              }"
              class="yc-image-preview-img"
              ref="imageRef"
            />
          </div>
          <!-- arrow -->
          <div class="yc-image-preview-arrow">
            <image-preview-arrow type="left" @click="handleChange('pre')" />
            <image-preview-arrow type="right" @click="handleChange('next')" />
          </div>
          <!-- toolbar -->
          <image-preview-toolbar
            :actionsLayout="actionsLayout"
            @click="handleAction"
          />
          <!-- close-btn -->
          <image-preview-close-btn
            v-if="closable"
            @click="handleClose('closeBtn', $event)"
          />
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import {
  ImagePreviewGroupProps,
  ImagePreviewGroupEmits,
  ImagePreviewGroupSlots,
} from './type';
import { onKeyStroke } from '@vueuse/core';
import { useControlValue } from '@shared/hooks';
import useImagePreview from './hooks/useImagePreview';
import ImagePreviewToolbar from './ImagePreviewToolbar.vue';
import ImagePreviewCloseBtn from './ImagePreviewCloseBtn.vue';
import ImagePreviewArrow from './ImagePreviewArrow.vue';
defineOptions({
  name: 'ImagePreviewGroup',
});
defineSlots<ImagePreviewGroupSlots>();
const props = withDefaults(defineProps<ImagePreviewGroupProps>(), {
  visible: undefined,
  defaultVisible: false,
  maskClosable: true,
  closable: true,
  actionsLayout: () => [
    'fullScreen',
    'rotateRight',
    'rotateLeft',
    'zoomIn',
    'zoomOut',
    'originalSize',
  ],
  popupContainer: undefined,
  escToClose: true,
  wheelZoom: true,
  keyboard: true,
  defaultScale: 1,
  zoomRate: 1.1,
  srcList: () => [],
  current: undefined,
  defaultCurrent: 1,
  infinite: false,
});
const emits = defineEmits<ImagePreviewGroupEmits>();
const { current, defaultCurrent, srcList, infinite, keyboard } = toRefs(props);
// 当前的链接
const computedCurrent = useControlValue<number>(
  current,
  defaultCurrent.value,
  (val) => {
    emits('update:current', val);
    emits('change', val);
  }
);
// src
const src = computed(() => srcList.value[computedCurrent.value]);
// imageRef
const imageRef = ref<HTMLImageElement>();
// 预览hook
const {
  scale,
  rotate,
  outerVisible,
  innerVisible,
  popupContainer,
  zIndex,
  handleClose,
  handleAfterLeave,
  handleAction,
} = useImagePreview(props, emits, imageRef);
// 处理index发生改变
const handleChange = (type: string) => {
  let index = 0;
  if (
    !infinite.value &&
    ((type == 'pre' && computedCurrent.value == 0) ||
      (type == 'next' && computedCurrent.value == srcList.value.length - 1))
  ) {
    return;
  }
  if (type == 'pre') {
    index = computedCurrent.value - 1;
    index = index < 0 ? srcList.value.length - 1 : index;
  } else {
    index = computedCurrent.value + 1;
    index = index == srcList.value.length ? 0 : index;
  }
  computedCurrent.value = index;
};
const intLisenter = () => {
  if (keyboard.value) {
    const map: Record<string, string> = {
      ArrowLeft: 'pre',
      ArrowRight: 'next',
    };
    onKeyStroke(['ArrowLeft', 'ArrowRight'], (e) => {
      handleChange(map[e.key]);
    });
  }
};
intLisenter();
</script>

<style lang="less" scoped>
@import './style/image-preview.less';
</style>
