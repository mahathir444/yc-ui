import { ref, Ref, computed, watch } from 'vue';
import { useMagicKeys, whenever } from '@vueuse/core';
import { isUndefined } from '@/utils/is';
import { ComptCloseType } from '@/type';
import { sleep } from '@/utils/fn';

export default (
  emits: (...args: any) => any,
  config: {
    maskClosable: Ref<boolean>;
    escToClose: Ref<boolean>;
    visible: Ref<boolean | undefined>;
    defaultVisible: Ref<boolean | undefined>;
  }
) => {
  const { maskClosable, escToClose, visible, defaultVisible } = config;
  // 外层visible，用于播放动画
  const outerVisible = ref<boolean>(false);
  // 内存visible，用于显示组件
  const innerVisible = computed(() => {
    if (!isUndefined(visible.value)) return visible.value;
    if (!isUndefined(defaultVisible.value)) return defaultVisible.value;
    return false;
  });
  // 非受控状态下的visible
  const controlVisible = ref<boolean>(false);
  // 关闭类型
  const closeType = ref<ComptCloseType>('');
  // 处理动画离开
  const handleAfterLeave = () => {
    emits('close', closeType.value);
    outerVisible.value = false;
  };
  // 处理关闭
  const handleClose = async (type: ComptCloseType) => {
    closeType.value = type;
    // 触发事件
    if (type == 'confirmBtn') {
      emits('ok');
    } else {
      emits('cancel', closeType.value);
    }
    // 关闭
    if (type == 'mask' && !maskClosable.value) return;
    // 如果是非受控状态关闭
    if (isUndefined(visible.value) && !isUndefined(defaultVisible.value)) {
      controlVisible.value = false;
    } else {
      emits('update:visible', false);
    }
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
      controlVisible.value = v;
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
    controlVisible,
    outerVisible,
    innerVisible,
    handleClose,
    handleAfterLeave,
  };
};
