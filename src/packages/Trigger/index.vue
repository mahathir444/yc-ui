<template>
  <default-slot
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
      @after-leave="$emit('hide')"
      @after-enter="$emit('show')"
    >
      <div
        v-if="!unmountOnClose || (computedVisible && !disabled)"
        v-show="computedVisible && !disabled"
        :class="['yc-trigger-container', $attrs.class, contentClass]"
        :style="contentCss"
        ref="contentRef"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
        <div class="yc-trigger-content">
          <slot name="content" />
        </div>
        <div
          v-if="showArrow"
          :class="['yc-trigger-arrow', arrowClass]"
          :style="arrowCss"
          ref="arrowRef"
        ></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, computed, useSlots, CSSProperties, toRefs } from 'vue';
import { sleep } from '@/utils/fn';
import { Postion, Trigger } from './type';
import vNodeRender from '@/utils/vnode-render';
import {
  useElementBounding,
  onClickOutside,
  useElementSize,
} from '@vueuse/core';
import useTriggerVisible from '@/hooks/useTriggerVisible';
import useTriggerPosition from '@/hooks/useTriggerPosition';
// popup-offset
const props = withDefaults(
  defineProps<{
    popupVisible?: boolean;
    defaultPopupVisible?: boolean;
    trigger?: Trigger;
    popupContainer?: string | HTMLElement;
    renderToBody?: boolean;
    position?: Postion;
    disabled?: boolean;
    popupTranslate?: number[];
    showArrow?: boolean;
    // 未实现
    alignPoint?: boolean;
    popuphoverStay?: boolean;
    blurToClose?: boolean;
    clickToClose?: boolean;
    //
    clickOutsidetoClose?: boolean;
    unmountOnClose?: boolean;
    contentClass?: string;
    contentStyle?: CSSProperties;
    arrowClass?: string;
    arrowStyle?: CSSProperties;
    animationName?: string;
    duration?: number;
  }>(),
  {
    popupVisible: undefined,
    defaultPopupVisible: false,
    trigger: 'click',
    popupContainer: 'body',
    renderToBody: false,
    position: 'bottom',
    disabled: false,
    popupTranslate: () => [0, 0],
    showArrow: true,
    alignPoint: false,
    popuphoverStay: true,
    blurToClose: true,
    clickToClose: true,
    unmountOnClose: true,
    contentStyle: () => {
      return {};
    },
    arrowStyle: () => {
      return {};
    },
    animationName: 'fade-in',
    duration: 300,
  }
);
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
  contentStyle,
  arrowStyle,
  clickOutsidetoClose,
} = toRefs(props);
// content的ref
const contentRef = ref<HTMLDivElement>();
// arrow的ref
const arrowRef = ref<HTMLDivElement>();
// trigger的ref
const triggerRef = ref<HTMLElement | null>(null);
// 处理关闭
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
  emits,
});
// 点击到contentRef外层关闭
onClickOutside(contentRef, async () => {
  await sleep(0);
  if (!computedVisible.value || !clickOutsidetoClose.value) return;
  computedVisible.value = false;
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
// 获取content元素的狂高
const { width: contentWidth, height: contentHeight } =
  useElementSize(contentRef);
const { width: arrowWidth, height: arrowHeight } = useElementSize(arrowRef);
// 计算trigger的位置信息
const { contentPosition, arrowPostion } = useTriggerPosition({
  position,
  left,
  top,
  bottom,
  right,
  triggerHeight,
  triggerWidth,
  contentHeight,
  contentWidth,
  arrowWidth,
  arrowHeight,
  popupTranslate,
});
// contentCss
const contentCss = computed(() => {
  return {
    ...contentPosition.value,
    ...contentStyle.value,
  } as CSSProperties;
});
// arrowcss
const arrowCss = computed(() => {
  return {
    ...arrowPostion.value,
    ...arrowStyle.value,
  } as CSSProperties;
});
// 获取默认插槽的vNode
const slots = useSlots();
const DefaultSlot = computed(() => slots.default && slots.default()[0]);
</script>

<style lang="less" scoped>
.yc-trigger-container {
  position: absolute;
  z-index: 1002;
  .yc-trigger-arrow {
    position: absolute;
    z-index: -1;
    transform: rotate(45deg);
    width: 8px;
    height: 8px;
    box-shadow: 0 2px 8px #00000026;
    background-color: #fff;
  }
}

// fade过渡
.fade-in-enter-from,
.fade-in-appear-from,
.fade-in-leave-to {
  opacity: 0;
}
.fade-in-enter-to,
.fade-in-appear-to,
.fade-in-leave-from {
  opacity: 1;
}
.fade-in-enter-active,
.fade-in-appear-active,
.fade-in-leave-active {
  transition: opacity 0.4s cubic-bezier(0.3, 1.3, 0.3, 1);
}
</style>
