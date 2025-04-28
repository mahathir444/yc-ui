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
          $attrs.class ?? '',
        ]"
        :style="{
          ...popupStyle,
          zIndex,
        }"
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
import { ref, computed, watch, useSlots } from 'vue';
import { TriggerProps, TriggerEmits } from './type';
import { TRIGGER_POSITION_MAP } from '@shared/constants';
import {
  findFirstLegitChild,
  sleep,
  isDOMObject,
  unrefElement,
} from '@shared/utils';
import { useConfigProvder } from '@shared/hooks';
import useTriggerVisible from './hooks/useTriggerVisible';
import useTriggerPosition from './hooks/useTriggerPosition';
import { YcPreventFocus } from '@shared/components';
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
  popupContainer: undefined,
  renderToBody: true,
  autoFitPosition: true,
  updateAtScroll: undefined,
  scrollToClose: undefined,
  scrollToCloseDistance: 1,
  preventFocus: false,
  alignPoint: false,
  needTransformOrigin: false,
  autoSetPosition: false,
});
const emits = defineEmits<TriggerEmits>();
// 接收属性
const { zIndex, popupContainer } = useConfigProvder(props);
// 弹出层的ref
const popupRef = ref<HTMLDivElement>();
// trigger的ref
const triggerRef = ref<HTMLElement>();
// 获取插槽
const slots = useSlots();
// slots
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
// 计算wrapper与arrow的位置信息
const { position, popupStyle, contentStyle, arrowStyle } = useTriggerPosition({
  props,
  popupRef,
  triggerRef,
  mouseX,
  mouseY,
});
// 处理点击到外层关闭
handleClickOutsideClose();
// 处理滚动关闭
handleScrollToClose();

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
