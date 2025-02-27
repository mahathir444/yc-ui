import { ref, toRefs, computed, CSSProperties } from 'vue';
import { TriggerPostion } from '@/packages/Trigger/type';
import { TooltipProps } from '@/packages/Tooltip/type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Trigger/constants';
export default (params: { props: TooltipProps }) => {
  const { props } = params;
  const { popupTranslate, contentStyle } = toRefs(props);
  // 当前的位置
  const triggerPostion = ref<TriggerPostion>('bottom');
  // popover-translate
  const computedTranslate = computed(() => {
    if (popupTranslate?.value) return popupTranslate.value;
    if (triggerPostion.value.startsWith('t')) {
      return [0, -10];
    } else if (triggerPostion.value.startsWith('b')) {
      return [0, 10];
    } else if (triggerPostion.value.startsWith('l')) {
      return [-10, 0];
    } else {
      return [10, 0];
    }
  });
  // content-style
  const computedContentStyle = computed(() => {
    return {
      transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion.value],
      ...contentStyle?.value,
    } as CSSProperties;
  });
  // 处理位置发生变化
  const handlePositionChange = (v: TriggerPostion) => {
    triggerPostion.value = v;
  };

  return {
    computedTranslate,
    computedContentStyle,
    handlePositionChange,
  };
};
