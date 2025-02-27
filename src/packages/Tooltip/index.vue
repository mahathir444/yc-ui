<template>
  <yc-trigger
    v-bind="props"
    wrapper-class="yc-tooltip"
    :arrow-class="`yc-tooltip-popup-arrow ${arrowClass}`"
    :content-class="`yc-tooltip-popup-content ${contentClass}`"
    :content-style="{
      transformOrigin: TRANSFORM_ORIGIN_MAP[tooltipPosition],
      ...contentStyle,
    }"
    :popup-translate="popoverTranslate"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="(v) => (tooltipPosition = v)"
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
import { computed, toRefs, ref } from 'vue';
import { TriggerPostion } from '../Trigger/type';
import { TooltipProps } from './type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Popover/constants';
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
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const { arrowClass, popupTranslate } = toRefs(props);
// 当前的位置
const tooltipPosition = ref<TriggerPostion>('bottom');
// popover-translate
const popoverTranslate = computed(() => {
  if (popupTranslate.value) return popupTranslate.value;
  if (tooltipPosition.value.startsWith('t')) {
    return [0, -10];
  } else if (tooltipPosition.value.startsWith('b')) {
    return [0, 10];
  } else if (tooltipPosition.value.startsWith('l')) {
    return [-10, 0];
  } else {
    return [10, 0];
  }
});
</script>

<style lang="less">
.yc-tooltip {
  .yc-tooltip-popup-content {
    max-width: 350px;
    padding: 8px 12px;
    background-color: rgb(29, 33, 41);
    border-radius: 2px;
    color: #fff;
    font-size: 14px;
    line-height: 1.5715;
    text-align: left;
    word-wrap: break-word;
  }
  .yc-trigger-arrow {
    &.yc-tooltip-popup-arrow {
      background-color: rgb(29, 33, 41);
    }
  }
}
</style>
