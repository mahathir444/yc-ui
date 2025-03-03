<template>
  <trigger-slot
    @click="handleClick"
    @contextmenu.prevent="handleContextmenu"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    @mousedown="handleMousedown"
    @focus="handleFocus"
    @blur="handleBlur"
    ref="triggerRef"
  />
  <Teleport :to="popupContainer" :disabled="!renderToBody">
    <Transition
      :name="animationName"
      :duration="duration"
      @after-leave="$emit('hide')"
      @after-enter="$emit('show')"
    >
      <!-- wrapper -->
      <div
        v-if="!unmountOnClose || (computedVisible && !disabled)"
        v-show="computedVisible && !disabled"
        :class="['yc-trigger', wrapperClass]"
        :style="wrapperPosition"
        ref="contentRef"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
        <!-- content -->
        <div :class="['yc-trigger-content', contentClass]" :style="contentCss">
          <slot name="content" />
        </div>
        <!-- arrow -->
        <div
          v-if="showArrow"
          :class="['yc-trigger-arrow', arrowClass]"
          :style="arrowCss"
        ></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, computed, useSlots, CSSProperties, toRefs } from 'vue';
import { TriggerProps, TriggerPostion } from './type';
import {
  useElementBounding,
  useElementSize,
  useResizeObserver,
} from '@vueuse/core';
import useTriggerVisible from '@/hooks/useTriggerVisible';
import useTriggerPosition from '@/hooks/useTriggerPosition';
defineOptions({
  name: 'Trigger',
});
const props = withDefaults(defineProps<TriggerProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  position: 'bottom',
  disabled: false,
  popupOffset: 0,
  popupTranslate: () => [0, 0],
  showArrow: false,
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
  animationName: 'fade-in',
  duration: 400,
  mouseEnterDelay: 1000,
  mouseLeaveDelay: 100,
  focusDelay: 100,
  autoFitPopupWidth: false,
  autoFitPopupMinWidth: false,
  popupContainer: 'body',
  renderToBody: true,
  preventFocus: false,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'position-change', value: TriggerPostion): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const {
  popupVisible,
  defaultPopupVisible,
  trigger,
  position,
  popupTranslate,
  popupOffset,
  contentStyle,
  arrowStyle,
  clickToClose,
  blurToClose,
  clickOutsideToClose,
  mouseEnterDelay,
  mouseLeaveDelay,
  preventFocus,
  focusDelay,
  duration,
  autoFitPopupWidth,
  autoFitPopupMinWidth,
} = toRefs(props);
// content的ref
const contentRef = ref<HTMLDivElement>();
// trigger的ref
const triggerRef = ref<HTMLElement | null>(null);
// 获取插槽
const slots = useSlots();
// 获取触发插槽
const TriggerSlot = computed(() => {
  const vNode = slots.default && slots.default()[0];
  return vNode?.key == '_default' ? (vNode.children as any)[0] : vNode;
});
// 处理trigger关闭与开启
const {
  computedVisible,
  handleMouseenter,
  handleMouseleave,
  handleFocus,
  handleBlur,
  handleContextmenu,
  handleMousedown,
  handleClick,
} = useTriggerVisible({
  popupVisible,
  defaultPopupVisible,
  preventFocus,
  trigger,
  clickToClose,
  blurToClose,
  clickOutsideToClose,
  mouseEnterDelay,
  mouseLeaveDelay,
  focusDelay,
  contentRef,
  emits,
});
// 获取trigger元素bounding
const {
  left,
  top,
  bottom,
  right,
  width: triggerWidth,
  height: triggerHeight,
} = useElementBounding(triggerRef);
const contentWidth = ref<number>(0);
const contentHeight = ref<number>(0);
// content的宽高
useResizeObserver(contentRef, () => {
  contentWidth.value = contentRef.value!.offsetWidth;
  contentHeight.value = contentRef.value!.offsetHeight;
});
// 计算wrapper与arrow的位置信息
const { wrapperPosition, arrowPostion } = useTriggerPosition({
  position,
  left,
  top,
  bottom,
  right,
  triggerHeight,
  triggerWidth,
  contentHeight,
  contentWidth,
  popupTranslate,
  popupOffset,
  emits,
});
// contentCss
const contentCss = computed(() => {
  return {
    ...contentStyle.value,
    width: autoFitPopupWidth.value ? `${triggerWidth.value}px` : '',
    minWidth: autoFitPopupMinWidth.value ? `${triggerWidth.value}px` : '',
  } as CSSProperties;
});
// arrowcss
const arrowCss = computed(() => {
  return {
    ...arrowPostion.value,
    ...arrowStyle.value,
  } as CSSProperties;
});

defineExpose({
  hide() {
    computedVisible.value = false;
  },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
