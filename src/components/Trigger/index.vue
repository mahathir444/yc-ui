<template>
  <component
    :is="vNode"
    @click="handleClickEvent($event, 'click')"
    @contextmenu.prevent="handleClickEvent($event, 'contextMenu')"
    @mouseenter="handleMouseenter(true)"
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
      <yc-prevent-focus
        v-if="!unmountOnClose || (computedVisible && !disabled)"
        v-show="computedVisible && !disabled"
        :prevent-focus="preventFocus"
        :data-group-id="groupId"
        :data-group-level="level"
        :style="contentPosition"
        :class="['yc-trigger', $attrs.class]"
        ref="contentRef"
        @mouseenter="handleMouseenter(false)"
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
      </yc-prevent-focus>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, computed, useSlots, CSSProperties, toRefs } from 'vue';
import { TriggerProps } from './type';
import { TRANSFORM_ORIGIN_MAP } from './constants';
import { useElementBounding, useElementSize } from '@vueuse/core';
import { findFirstLegitChild } from '@shared/utils/vue-vnode';
import useTriggerVisible from '@shared/hooks/useTriggerVisible';
import useTriggerPosition from '@shared/hooks/useTriggerPosition';
defineOptions({
  name: 'Trigger',
  inheritAttrs: false,
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
  isDropdown: false,
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
  isDropdown,
} = toRefs(props);
// content的ref
const contentRef = ref<HTMLDivElement>();
// trigger的ref
const triggerRef = ref<HTMLElement>();
// 获取插槽
const slots = useSlots();
const vNode = computed(() => findFirstLegitChild(slots.default?.() || []));
// 处理trigger关闭与开启
const {
  computedVisible,
  level,
  groupId,
  mouseX,
  mouseY,
  handleClickEvent,
  handleMouseenter,
  handleMouseleave,
  handleFocus,
  handleBlur,
  handleClickOutsideClose,
  handleScrollToClose,
} = useTriggerVisible({
  triggerRef,
  isDropdown,
  contentRef,
  trigger,
  popupVisible,
  defaultPopupVisible,
  clickToClose,
  blurToClose,
  clickOutsideToClose,
  mouseEnterDelay,
  mouseLeaveDelay,
  focusDelay,
  scrollToClose,
  scrollToCloseDistance,
  emits,
});
// 初始化trigger地计算参数
const { contentPosition, contentCss, arrowCss } = initTrigger();
// 初始化trigger
function initTrigger() {
  if (!vNode.value) {
    return {
      contentPosition: {},
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
  const { contentPosition, arrowPostion, triggerPosition } = useTriggerPosition(
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
  // 处理点击到外层关闭
  handleClickOutsideClose();
  // 处理滚动关闭
  handleScrollToClose(left, top);
  return {
    contentPosition,
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
@import './style/trigger.less';
</style>
