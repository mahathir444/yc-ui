import { ref, Ref, watch } from 'vue';
import { OnBeforeCancel, OnBeforeOk } from '@/components/Modal/type';
import { CloseType } from '@/components/_type';
import { useMagicKeys, whenever } from '@vueuse/core';
import useControlValue from './useControlValue';
import useOnBeforeClose from './useOnBeforeClose';

export default (params: {
  maskClosable: Ref<boolean>;
  escToClose: Ref<boolean>;
  visible: Ref<boolean | undefined>;
  defaultVisible: Ref<boolean>;
  onBeforeOk: OnBeforeOk;
  onBeforeCancel: OnBeforeCancel;
  emits: (...args: any) => any;
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
    (val) => emits('update:visible', val)
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
  const initHotKeys = () => {
    const keys = useMagicKeys();
    whenever(keys.escape, () => {
      if (!escToClose.value || !innerVisible.value) return;
      handleClose('esc');
    });
  };
  initHotKeys();

  // 检测visible的开关，从而决定打开组件还是关闭组件
  watch(
    () => innerVisible.value,
    (v) => {
      closeType.value = '';
      if (v) {
        outerVisible.value = true;
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
