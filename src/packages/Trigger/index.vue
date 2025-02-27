<template>
  <trigger-slot
    @click="handleClick"
    @contextmenu="handleContextmenu"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    @focus="handleFocus"
    @blur="handleBlur"
    ref="triggerRef"
  />
  <Teleport :to="popupContainer" :disabled="renderToBody">
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
        :class="['yc-trigger-container', wrapperClass]"
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
import { ref, computed, useSlots, CSSProperties, toRefs, h, VNode } from 'vue';
import { TriggerProps, TriggerPostion } from './type';
import { useElementBounding, useElementSize } from '@vueuse/core';
import useTriggerVisible from '@/hooks/useTriggerVisible';
import useTriggerPosition from '@/hooks/useTriggerPosition';
defineOptions({
  name: 'Trigger',
});
const props = withDefaults(defineProps<TriggerProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  popupContainer: 'body',
  renderToBody: false,
  position: 'bottom',
  disabled: false,
  popupTranslate: undefined,
  showArrow: false,
  blurToClose: true,
  clickOutsidetoClose: true,
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
  contentStyle,
  arrowStyle,
  clickToClose,
  blurToClose,
  clickOutsidetoClose,
  mouseEnterDelay,
  mouseLeaveDelay,
  focusDelay,
  duration,
  autoFitPopupWidth,
  autoFitPopupMinWidth,
} = toRefs(props);
// content的ref
const contentRef = ref<HTMLDivElement>();
// trigger的ref
const triggerRef = ref<HTMLElement | null>(null);
// 获取默认插槽的vNode
const slots = useSlots();
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
  handleClick,
} = useTriggerVisible({
  popupVisible,
  defaultPopupVisible,
  trigger,
  clickToClose,
  blurToClose,
  clickOutsidetoClose,
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
// content的宽高
const { width: contentWidth, height: contentHeight } =
  useElementSize(contentRef);
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
</script>

<style lang="less" scoped>
.yc-trigger-container {
  position: absolute;
  z-index: 1002;
  .yc-trigger-arrow {
    z-index: -1;
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #fff;
  }
}
</style>
