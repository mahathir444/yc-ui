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
                transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
              }"
              class="yc-image-preview-img"
              ref="imageRef"
              @mousedown.prevent=""
              @load="getOriginPosition"
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
import { useConfigProvder, useControlValue } from '@shared/hooks';
import { useDraggable, useEventListener, onKeyStroke } from '@vueuse/core';
import useModalClose from '../Modal/hooks/useModalClose';
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
const {
  visible,
  defaultVisible,
  maskClosable,
  escToClose,
  closable,
  defaultScale,
  zoomRate,
  wheelZoom,
  keyboard,
} = toRefs(props);
const { zIndex, popupContainer } = useConfigProvder(props);
// scale
const scale = useControlValue(ref(), defaultScale.value);
// rotate
const rotate = ref<number>(0);
// imageRef
const imageRef = ref<HTMLImageElement>();
// 图片拖动
const { x, y } = useDraggable(imageRef);
// 处理Modal关闭
const { outerVisible, innerVisible, handleClose, handleAfterLeave } =
  useModalClose({
    visible,
    defaultVisible,
    escToClose,
    maskClosable,
    onBeforeOk: () => true,
    onBeforeCancel: () => true,
    emits: emits as any,
  });
// 处理action
const handleAction = (action: string) => {
  switch (action) {
    case 'rotateRight':
      {
        rotate.value += 90;
      }
      break;
    case 'rotateLeft':
      {
        rotate.value -= 90;
      }
      break;
    case 'zoomIn':
      {
        scale.value *= zoomRate.value;
      }
      break;
    case 'zoomOut':
      {
        scale.value /= zoomRate.value;
      }
      break;
    case 'originalSize':
      {
        scale.value = defaultScale.value;
        rotate.value = 0;
        x.value = (window.innerWidth - imageRef.value!.offsetWidth) / 2;
        y.value = (window.innerHeight - imageRef.value!.offsetHeight) / 2;
      }
      break;
    case 'fullScreen':
      {
        const { offsetWidth, offsetHeight } = imageRef.value!;
        if (offsetWidth > offsetHeight) {
          scale.value = window.innerHeight / offsetHeight;
        } else {
          scale.value = window.innerHeight / offsetWidth;
        }
      }
      break;
  }
};
// 获取originX与y
const getOriginPosition = () => {
  const originX = (window.innerWidth - imageRef.value!.offsetWidth) / 2;
  const originY = (window.innerWidth - imageRef.value!.offsetWidth) / 2;
  x.value = originX;
  y.value = originY;
};
// 初始化监听器
const intLisenter = () => {
  if (wheelZoom.value) {
    // 处理滚轮缩放
    useEventListener('wheel', (e) => {
      e.preventDefault();
      // 判断是放大还是缩小
      const delta = e.deltaY < 0 ? 1 : -1;
      // 计算新的缩放比例
      scale.value *= Math.pow(zoomRate.value, delta);
    });
  }
  if (keyboard.value) {
    const map: Record<string, string> = {
      ArrowUp: 'zoomIn',
      ArrowDown: 'zoomOut',
      ' ': 'originalSize',
    };
    onKeyStroke(['ArrowUp', 'ArrowDown', ' '], (e) => {
      handleAction(map[e.key]);
    });
  }
};
intLisenter();
</script>

<style lang="less" scoped>
@import './style/image-preview.less';
</style>
