<template>
  <yc-trigger
    v-bind="props"
    wrapper-class="yc-tooltip"
    :arrow-class="`yc-tooltip-popup-arrow ${arrowClass ?? ''}`"
    :arrow-style="{
      ...arrowStyle,
      backgroundColor,
    }"
    :content-class="`yc-tooltip-popup-content ${contentClass ?? ''} ${mini ? 'yc-tooltip-mini' : ''}`"
    :content-style="{
      ...computedContentStyle,
      backgroundColor,
    }"
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
import { TooltipProps } from './type';
import useTriggerConfig from '@/hooks/useTriggerConfig';
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
  mini: true,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const { computedTranslate, computedContentStyle, handlePositionChange } =
  useTriggerConfig(props as any);
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
