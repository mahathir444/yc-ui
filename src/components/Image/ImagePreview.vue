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
                transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
              }"
              class="yc-image-preview-img"
              ref="imageRef"
            />
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
import { ref, toRefs } from 'vue';
import {
  ImagePreviewProps,
  ImagePreviewEmits,
  ImagePreviewSlots,
} from './type';
import useImagePreview from './hooks/useImagePreview';
import ImagePreviewToolbar from './ImagePreviewToolbar.vue';
import ImagePreviewCloseBtn from './ImagePreviewCloseBtn.vue';
defineOptions({
  name: 'ImagePreview',
});
defineSlots<ImagePreviewSlots>();
const props = withDefaults(defineProps<ImagePreviewProps>(), {
  src: '',
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
});
const emits = defineEmits<ImagePreviewEmits>();
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
</script>

<style lang="less" scoped>
@import './style/image-preview.less';
</style>
