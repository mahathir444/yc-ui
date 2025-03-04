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
    wrapper-class="yc-dropdown"
    :arrow-class="`${arrowClass ?? ''} yc-dropdown-popup-arrow `"
    :arrow-style="arrowStyle"
    :content-class="`${contentClass ?? ''} yc-dropdown-popup-content`"
    :content-style="computedContentStyle"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="(v) => (triggerPostion = v)"
    ref="triggerRef"
  >
    <slot />
    <template #content> </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, CSSProperties } from 'vue';
import { TriggerPostion } from '@/packages/Trigger/type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Trigger/constants';
import { DropdownProps } from './type';
import { TriggerInstance } from '@/packages/Trigger';
import YcTrigger from '@/packages/Trigger/index.vue';
defineOptions({
  name: 'Popconfirm',
});
const props = withDefaults(defineProps<DropdownProps>(), {
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
  mouseEnterDelay: 1000,
  mouseLeaveDelay: 100,
  focusDelay: 100,
  autoFitPopupWidth: false,
  autoFitPopupMinWidth: false,
  popupContainer: 'body',
  renderToBody: true,
  content: '',
  okText: '确定',
  cancelText: '取消',
  type: 'info',
  okLoading: false,
  okButtonProps: () => {
    return {};
  },
  cancelButtonProps: () => {
    return {};
  },
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
  (e: 'ok'): void;
  (e: 'cancel'): void;
  (e: 'select'): void;
}>();
const { popupTranslate, contentStyle } = toRefs(props);
// 当前的位置
const triggerPostion = ref<TriggerPostion>('bottom');
// content-style
const computedContentStyle = computed(() => {
  return {
    transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion.value],
    ...contentStyle?.value,
  } as CSSProperties;
});
// 触发器实例
const triggerRef = ref<TriggerInstance>();
</script>

<style lang="less"></style>
