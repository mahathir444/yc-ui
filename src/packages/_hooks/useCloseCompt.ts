import { ref, Ref, computed, watch } from 'vue';
import { useMagicKeys, whenever } from '@vueuse/core';
import { isUndefined } from '@/packages/_utils/is';
import { CloseType } from '@/packages/_type';
import useControlValue from './useControlValue';

export default (
  emits: (...args: any) => any,
  config: {
    maskClosable: Ref<boolean>;
    escToClose: Ref<boolean>;
    visible: Ref<boolean | undefined>;
    defaultVisible: Ref<boolean>;
  }
) => {
  const { maskClosable, escToClose, visible, defaultVisible } = config;
  // 外层visible，用于播放动画
  const outerVisible = ref<boolean>(false);
  // 内存visible，用于显示组件
  const innerVisible = useControlValue(visible, defaultVisible, (val) => {
    emits('update:visible', val);
  });
  // 关闭类型
  const closeType = ref<CloseType>('');
  // 处理动画离开
  const handleAfterLeave = () => {
    emits('close', closeType.value);
    outerVisible.value = false;
  };
  // 处理关闭
  const handleClose = async (type: CloseType) => {
    closeType.value = type;
    // 触发事件
    if (type == 'confirmBtn') {
      emits('ok');
    } else {
      emits('cancel', closeType.value);
    }
    // 关闭
    if (type == 'mask' && !maskClosable.value) return;
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
