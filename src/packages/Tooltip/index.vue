<template>
  <yc-trigger
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :trigger="trigger"
    :popup-container="popupContainer"
    :render-to-body="renderToBody"
    :position="position"
    :disabled="disabled"
    :popup-offset="popupOffset"
    :popup-translate="popupTranslate"
    :show-arrow="showArrow"
    :blur-to-close="blurToClose"
    :click-to-close="clickToClose"
    :unmount-on-close="unmountOnClose"
    :animation-name="animationName"
    :duration="duration"
    :mouse-enter-delay="mouseEnterDelay"
    :mouse-leave-delay="mouseLeaveDelay"
    :focus-delay="focusDelay"
    :auto-fit-popup-width="autoFitPopupWidth"
    :auto-fit-popup-min-width="autoFitPopupMinWidth"
    :prevent-focus="preventFocus"
    wrapper-class="yc-tooltip"
    :arrow-class="`yc-tooltip-popup-arrow ${arrowClass ?? ''}`"
    :arrow-style="computedArrowStyle"
    :content-class="`yc-tooltip-popup-content ${contentClass ?? ''} ${mini ? 'yc-tooltip-mini' : ''}`"
    :content-style="computedContentStyle"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="(v) => (triggerPostion = v)"
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
import { ref, toRefs, computed, CSSProperties } from 'vue';
import { TriggerPostion } from '@/packages/Trigger/type';
import { TooltipProps } from './type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Trigger/constants';
import YcTrigger from '@/packages/Trigger/index.vue';
defineOptions({
  name: 'Tooltip',
});
const props = withDefaults(defineProps<TooltipProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  position: 'bottom',
  disabled: false,
  popupOffset: 10,
  popupTranslate: () => [0, 0],
  showArrow: true,
  blurToClose: true,
  clickOutsideToClose: true,
  clickToClose: true,
  unmountOnClose: true,
  contentStyle: () => {
    return {};
  },
  arrowStyle: () => {
    return {};
  },
  animationName: 'zoom-in-fade-out',
  duration: 400,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  focusDelay: 100,
  autoFitPopupWidth: false,
  autoFitPopupMinWidth: false,
  popupContainer: 'body',
  renderToBody: true,
  preventFocus: false,
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
</script>

<style lang="less">
@import './index.less';
</style>
