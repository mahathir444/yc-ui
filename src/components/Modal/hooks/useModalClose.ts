import { ref, Ref, watch } from 'vue';
import {
  ModalEmits,
  OnBeforeCancel,
  OnBeforeOk,
} from '@/components/Modal/type';
import { onKeyStroke } from '@vueuse/core';
import { useControlValue } from '@shared/hooks';
import useOnBeforeClose from './useOnBeforeClose';

export default (params: {
  visible: Ref<boolean | undefined>;
  defaultVisible: Ref<boolean>;
  maskClosable: Ref<boolean>;
  escToClose: Ref<boolean>;
  onBeforeOk: OnBeforeOk;
  onBeforeCancel: OnBeforeCancel;
  emits: ModalEmits;
}) => {
  const {
    maskClosable,
    escToClose,
    visible,
    defaultVisible,
    onBeforeCancel,
    onBeforeOk,
    emits,
  } = params;
  // 外层visible，用于播放动画
  const outerVisible = ref<boolean>(false);
  // 内存visible，用于显示组件
  const innerVisible = useControlValue<boolean>(
    visible,
    defaultVisible.value,
    (val) => {
      emits('update:visible', val);
    }
  );
  // 处理动画离开
  const handleAfterLeave = () => {
    emits('close');
    outerVisible.value = false;
  };
  // 处理关闭
  const handleClose = async (type: string, ev: MouseEvent | KeyboardEvent) => {
    // 执行关闭之前的函数
    const isClose = await useOnBeforeClose(type, onBeforeOk, onBeforeCancel);
    if (!isClose) {
      return;
    }
    if (type == 'mask' && !maskClosable.value) {
      return;
    }
    if (type == 'confirmBtn') {
      emits('ok');
    } else if (type == 'cancelBtn') {
      emits('cancel', ev);
    }
    innerVisible.value = false;
  };

  if (escToClose.value) {
    onKeyStroke(['Escape'], (ev) => {
      if (!innerVisible.value) return;
      handleClose('esc', ev);
    });
  }

  // 检测
  watch(
    innerVisible,
    (val) => {
      if (val) {
        outerVisible.value = val;
      }
    },
    {
      immediate: true,
    }
  );

  return {
    outerVisible,
    innerVisible,
    handleClose,
    handleAfterLeave,
  };
};
