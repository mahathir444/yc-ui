<template>
  <component
    :is="vNode"
    @click="handleClickEvent"
    @contextmenu.prevent="handleClickEvent"
    @mouseenter="handleMouseenter"
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
        :class="[
          'yc-trigger',
          TRIGGER_POSITION_MAP[position],
          needTransformOrigin ? 'yc-trigger-transform-origin' : '',
          $attrs.class,
        ]"
        :style="popupPosition"
        ref="popupRef"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
        <!-- content -->
        <div
          :class="['yc-trigger-content', contentClass]"
          :style="contentStyle"
        >
          <slot name="content" />
        </div>
        <!-- arrow -->
        <div
          v-if="showArrow"
          :class="['yc-trigger-arrow', arrowClass]"
          :style="arrowStyle"
        ></div>
      </yc-prevent-focus>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, computed, useSlots } from 'vue';
import { TriggerProps, TriggerEmits } from './type';
import { TRIGGER_POSITION_MAP } from '@shared/constants';
import { findFirstLegitChild } from '@shared/utils';
import useTriggerVisible from '@shared/hooks/useTriggerVisible';
import useTriggerPosition from '@shared/hooks/useTriggerPosition';
import YcPreventFocus from '@shared/components/PreventFocus';
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
  autoSetPosition: false,
});
const emits = defineEmits<TriggerEmits>();
// 弹出层的ref
const popupRef = ref<HTMLDivElement>();
// trigger的ref
const triggerRef = ref<HTMLElement>();
// 获取插槽
const slots = useSlots();
const vNode = computed(() => findFirstLegitChild(slots.default?.() || []));
// 处理trigger关闭与开启
const {
  level,
  groupId,
  computedVisible,
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
  props,
  emits,
  popupRef,
  triggerRef,
});
// 初始化trigger地计算参数
const { left, top, bottom, right, popupPosition, contentStyle, arrowStyle } =
  initTrigger();
// 初始化trigger
function initTrigger() {
  if (!vNode.value) {
    return {
      popupPosition: {},
      contentStyle: {},
      arrowStyle: {},
      left: ref(0),
      top: ref(0),
      bottom: ref(0),
      right: ref(0),
    };
  }
  // 计算wrapper与arrow的位置信息
  const { left, top, bottom, right, popupPosition, contentStyle, arrowStyle } =
    useTriggerPosition({
      props,
      popupRef,
      triggerRef,
      mouseX,
      mouseY,
    });
  // 处理点击到外层关闭
  handleClickOutsideClose();
  // 处理滚动关闭
  handleScrollToClose(left, top);
  return {
    popupPosition,
    contentStyle,
    arrowStyle,
    left,
    top,
    bottom,
    right,
  };
}

defineExpose({
  hide() {
    computedVisible.value = false;
  },
  show() {
    computedVisible.value = true;
  },
  updatePosition(x: number, y: number) {
    mouseX.value = x;
    mouseY.value = y;
  },
  getPopupRef() {
    return popupRef.value;
  },
});
</script>

<style lang="less" scoped>
@import './style/trigger.less';
</style>
