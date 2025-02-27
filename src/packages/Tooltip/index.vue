<template>
  <yc-trigger
    v-bind="props"
    wrapper-class="yc-tooltip"
    :arrow-class="`yc-tooltip-popup-arrow ${arrowClass ?? ''}`"
    :arrow-style="computedArrowStyle"
    :content-class="`yc-tooltip-popup-content ${contentClass ?? ''} ${mini ? 'yc-tooltip-mini' : ''}`"
    :content-style="computedContentStyle"
    :popup-translate="computedTranslate"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="handlePositionChange"
  >
    <slot />
    <template #content>
      <div>
        <slot name="content" />
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, CSSProperties, Reactive } from 'vue';
import { TriggerPostion } from '@/packages/Trigger/type';
import { TooltipProps } from './type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Trigger/constants';
import YcTrigger from '../Trigger/index.vue';
defineOptions({
  name: 'Tooltip',
});
const props = withDefaults(defineProps<TooltipProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  popupContainer: 'body',
  renderToBody: false,
  position: 'bottom',
  disabled: false,
  popupTranslate: undefined,
  showArrow: true,
  blurToClose: true,
  clickOutsidetoClose: true,
  clickToClose: true,
  unmountOnClose: false,
  contentStyle: () => {
    return {};
  },
  arrowStyle: () => {
    return {};
  },
  animationName: 'zoom-in-fade-out',
  duration: 400,
  mouseEnterDelay: 1000,
  mouseLeaveDelay: 100,
  focusDelay: 100,
  autoFitPopupWidth: false,
  autoFitPopupMinWidth: false,
  title: '',
  content: '',
  backgroundColor: 'rgb(29, 33, 41)',
  mini: false,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const { popupTranslate, arrowStyle, contentStyle, backgroundColor } =
  toRefs(props);
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
    backgroundColor: backgroundColor.value,
    ...contentStyle.value,
  } as CSSProperties;
});
// arrowStyle
const computedArrowStyle = computed(() => {
  return {
    backgroundColor: backgroundColor.value,
    ...arrowStyle.value,
  };
});
// 处理位置发生变化
const handlePositionChange = (v: TriggerPostion) => {
  triggerPostion.value = v;
};
</script>

<style lang="less">
.yc-tooltip {
  .yc-tooltip-popup-content {
    max-width: 350px;
    padding: 8px 12px;
    border-radius: 2px;
    color: #fff;
    font-size: 14px;
    line-height: 1.5715;
    text-align: left;
    word-wrap: break-word;
    &.yc-tooltip-mini {
      padding: 4px 12px;
      font-size: 14px;
    }
  }
}
</style>
