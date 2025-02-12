import {
  Ref,
  computed,
  CSSProperties,
  onMounted,
  onBeforeUnmount,
  watch,
} from 'vue';
import { sleep } from '@/utils/fn';
import { useDraggable } from '@vueuse/core';

export default (config: {
  visible: Ref<boolean>;
  draggable: Ref<boolean>;
  alignCenter: Ref<boolean>;
  top: Ref<number>;
  triggerRef: Ref<HTMLDivElement | undefined>;
  modalRef: Ref<HTMLDivElement | undefined>;
}) => {
  // 结构钢通用属性
  const { visible, triggerRef, modalRef, draggable, alignCenter, top } = config;
  //   拖拽
  const { x, y, isDragging } = useDraggable(triggerRef);
  // 拖拽样式
  const dragStyle = computed(() => {
    return {
      position: 'absolute',
      left: x.value + 'px',
      top: y.value + 'px',
    } as CSSProperties;
  });
  // 处理越界问题
  const handleOutOfBound = () => {
    if (!isDragging.value) return;
    const maxX = window.innerWidth - modalRef.value!.offsetWidth;
    const maxY = window.innerHeight - modalRef.value!.offsetHeight;
    x.value = x.value >= maxX ? maxX : x.value;
    x.value = x.value <= 0 ? 0 : x.value;
    y.value = y.value >= maxY ? maxY : y.value;
    y.value = y.value <= 0 ? 0 : y.value;
  };
  onMounted(() => {
    window.addEventListener('mousemove', handleOutOfBound);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleOutOfBound);
  });
  // 计算初始位置
  watch(
    () => visible.value,
    async (v) => {
      if (!v || !draggable.value) return;
      await sleep(0);
      y.value = (window.innerHeight - modalRef.value!.offsetHeight) / 2;
      x.value = alignCenter.value
        ? (window.innerWidth - modalRef.value!.offsetWidth) / 2
        : top.value;
    },
    {
      immediate: true,
    }
  );
  return {
    dragStyle,
  };
};
