import { ref, Ref, computed, watch } from 'vue';
import { CloseType, Fn } from '../type';
import { OnBeforeCancel, OnBeforeOk } from '@/components/Modal/type';
import { PopupContainer } from '@/components/Trigger';
import { useMagicKeys, whenever } from '@vueuse/core';
import useControlValue from './useControlValue';
import useOnBeforeClose from './useOnBeforeClose';

export default (params: {
  visible: Ref<boolean | undefined>;
  defaultVisible: Ref<boolean>;
  maskClosable: Ref<boolean>;
  escToClose: Ref<boolean>;
  onBeforeOk: OnBeforeOk;
  onBeforeCancel: OnBeforeCancel;
  emits: Fn;
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
  // 关闭类型
  const closeType = ref<CloseType>('');
  // 处理动画离开
  const handleAfterLeave = () => {
    emits('close', closeType.value);
    outerVisible.value = false;
  };
  // 处理关闭
  const handleClose = async (type: CloseType) => {
    // 执行关闭之前的函数
    const isClose = await useOnBeforeClose(type, onBeforeOk, onBeforeCancel);
    if (!isClose) {
      return;
    }
    if (type == 'mask' && !maskClosable.value) {
      return;
    }
    // 执行关闭逻辑
    closeType.value = type;
    if (type == 'confirmBtn') {
      emits('ok');
    } else if (type == 'cancelBtn') {
      emits('cancel', closeType.value);
    }
    innerVisible.value = false;
  };
  // 初始化关闭快捷键
  const keys = useMagicKeys();
  whenever(keys.escape, () => {
    if (!escToClose.value || !innerVisible.value) return;
    handleClose('esc');
  });
  // 检测
  watch(
    innerVisible,
    (val) => {
      closeType.value = '';
      if (val) {
        outerVisible.value = val;
      }
    },
    {
      immediate: true,
    }
  );

  return {
    closeType,
    outerVisible,
    innerVisible,
    handleClose,
    handleAfterLeave,
  };
};
