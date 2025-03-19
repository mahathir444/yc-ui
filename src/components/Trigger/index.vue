<template>
  <component
    :is="findFirstLegitChild(vNodes)"
    @click="handleClick"
    @contextmenu.prevent="handleContextmenu"
    @mouseenter="handleMouseenter(true, $event)"
    @mouseleave="handleMouseleave"
    @focus="handleFocus"
    @blur="handleBlur"
    ref="triggerRef"
  />
  <teleport :to="popupContainer" :disabled="!renderToBody">
    <transition
      :name="animationName"
      :duration="duration"
      @after-leave="$emit('hide')"
      @after-enter="$emit('show')"
    >
      <!-- wrapper -->
      <div
        v-if="!unmountOnClose || (computedVisible && !disabled)"
        v-show="computedVisible && !disabled"
        v-prevent="{
          eventName: 'mousedown',
          isPrevent: preventFocus,
        }"
        :class="['yc-trigger', wrapperClass]"
        :style="wrapperPosition"
        ref="contentRef"
        @mouseenter="handleMouseenter(false, $event)"
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
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  useSlots,
  CSSProperties,
  toRefs,
  watchEffect,
} from 'vue';
import { TRANSFORM_ORIGIN_MAP } from './constants';
import { useElementBounding, useElementSize } from '@vueuse/core';
import useTriggerVisible from '@/components/_hooks/useTriggerVisible';
import useTriggerPosition from '@/components/_hooks/useTriggerPosition';
import { TriggerProps } from './type';
import { findFirstLegitChild } from '@/components/_utils/vue-utils';
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
  clickToClose: true,
  clickOutsideToClose: true,
  unmountOnClose: true,
  contentClass: '',
  contentStyle: () => {
    return {};
  },
  arrowClass: '',
  arrowStyle: () => {
    return {};
  },
  animationName: 'fade',
  duration: 400,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  focusDelay: 0,
  autoFitPopupWidth: false,
  autoFitPopupMinWidth: false,
  popupContainer: 'body',
  renderToBody: true,
  autoFitPosition: true,
  updateAtScroll: true,
  scrollToClose: false,
  scrollToCloseDistance: 0.1,
  preventFocus: false,
  alignPoint: false,
  needTransformOrigin: false,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
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
  updateAtScroll,
  scrollToClose,
  scrollToCloseDistance,
  autoFitPosition,
  alignPoint,
  needTransformOrigin,
} = toRefs(props);
const { clickOutSideIngoreFn, mouseenterCallback } = props;
// content的ref
const contentRef = ref<HTMLDivElement>();
// trigger的ref
const triggerRef = ref<HTMLElement | null>(null);
// 获取插槽
const slots = useSlots();
const vNodes = computed(() => slots?.default?.() ?? []);
// 处理trigger关闭与开启
const {
  computedVisible,
  mouseX,
  mouseY,
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
  clickOutsideToClose,
  mouseEnterDelay,
  mouseLeaveDelay,
  focusDelay,
  contentRef,
  clickOutSideIngoreFn,
  mouseenterCallback,
  emits,
});
// 初始化trigger地计算参数
const { wrapperPosition, contentCss, arrowCss } = initTrigger();
// 初始化trigger
function initTrigger() {
  if (!vNodes.value.length) {
    return {
      wrapperPosition: {},
      contentCss: {},
      arrowCss: {},
    };
  }
  // 获取trigger元素bounding
  const {
    left,
    top,
    bottom,
    right,
    width: triggerWidth,
    height: triggerHeight,
  } = useElementBounding(triggerRef, {
    windowScroll: updateAtScroll.value,
  });
  // 获取content元素的信息
  const { width: contentWidth, height: contentHeight } = useElementSize(
    contentRef,
    undefined,
    {
      box: 'border-box',
    }
  );
  // 计算wrapper与arrow的位置信息
  const { wrapperPosition, arrowPostion, triggerPosition } = useTriggerPosition(
    {
      position,
      left,
      top,
      bottom,
      right,
      mouseX,
      mouseY,
      alignPoint,
      trigger,
      triggerHeight,
      triggerWidth,
      contentHeight,
      contentWidth,
      popupTranslate,
      popupOffset,
      autoFitPosition,
      emits,
    }
  );
  // contentCss
  const contentCss = computed(() => {
    return {
      ...contentStyle.value,
      width: autoFitPopupWidth.value ? `${triggerWidth.value}px` : '',
      minWidth: autoFitPopupMinWidth.value ? `${triggerWidth.value}px` : '',
      transformOrigin: needTransformOrigin.value
        ? TRANSFORM_ORIGIN_MAP[triggerPosition.value]
        : '',
    } as CSSProperties;
  });
  // arrowcss
  const arrowCss = computed(() => {
    return {
      ...arrowPostion.value,
      ...arrowStyle.value,
    } as CSSProperties;
  });
  // 检测滚动关闭
  if (scrollToClose.value) {
    let oldLeft = left.value;
    let oldTop = top.value;
    watchEffect(() => {
      if (!computedVisible.value) return;
      const distanceX = Math.abs(oldLeft - left.value);
      const distanceY = Math.abs(oldTop - top.value);
      if (
        distanceX >= scrollToCloseDistance.value ||
        distanceY >= scrollToCloseDistance.value
      ) {
        computedVisible.value = false;
      }
      oldLeft = left.value;
      oldTop = top.value;
    });
  }
  return {
    wrapperPosition,
    contentCss,
    arrowCss,
  };
}

defineExpose({
  hide() {
    computedVisible.value = false;
  },
  show() {
    computedVisible.value = true;
  },
});
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
