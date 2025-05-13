import { ref, toRefs, Ref } from 'vue';
import { Props } from '@shared/type';
import { useConfigProvder, useControlValue } from '@shared/hooks';
import { useEventListener, onKeyStroke } from '@vueuse/core';
import useModalClose from '@/components/Modal/hooks/useModalClose';
export default (
  props: Props,
  emits: (...args: any) => void,
  imageRef: Ref<HTMLImageElement | undefined>
) => {
  const {
    visible,
    defaultVisible,
    maskClosable,
    escToClose,
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
  // 处理Modal关闭
  const { outerVisible, innerVisible, handleClose, handleAfterLeave } =
    useModalClose({
      visible,
      defaultVisible,
      escToClose,
      maskClosable,
      onBeforeOk: () => true,
      onBeforeCancel: () => true,
      emits,
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
  return {
    scale,
    rotate,
    zIndex,
    popupContainer,
    outerVisible,
    innerVisible,
    handleAction,
    handleClose,
    handleAfterLeave,
  };
};
