<template>
  <default-slot
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    @contextmenu="handleContextmenu"
    ref="triggerRef"
  />
  <Teleport :to="popupContainer" :disabled="renderToBody">
    <Transition name="fade">
      <div
        v-if="computedVisible && !disabled"
        :class="['yc-trigger-container', $attrs.class]"
        :style="triggerCss"
        ref="contentRef"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
        <div class="yc-trigger-content">
          <slot name="content" />
        </div>
        <!-- <div class="yc-trggier-arrow"></div> -->
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, computed, useSlots, CSSProperties, toRefs } from 'vue';
import { useElementBounding, onClickOutside } from '@vueuse/core';
import { sleep } from '@/utils/fn';
import { Postion, Trigger } from './type';
import { isUndefined } from '@/utils/is';
import vNodeRender from '@/utils/vnode-render';
import useTriggerVisible from '@/hooks/useTriggerVisible';

const props = withDefaults(
  defineProps<{
    popupVisible?: boolean;
    defaultPopupVisible?: boolean;
    trigger?: Trigger;
    popupContainer?: string | HTMLElement;
    renderToBody?: boolean;
    position?: Postion;
    disabled?: boolean;
  }>(),
  {
    popupVisible: undefined,
    defaultPopupVisible: false,
    trigger: 'click',
    popupContainer: 'body',
    renderToBody: false,
    position: 'bottom',
    disabled: false,
  }
);

const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
}>();

const { popupVisible, defaultPopupVisible, trigger } = toRefs(props);
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
// content的组件实例
const contentRef = ref<HTMLDivElement>();

// trigger的re
const triggerRef = ref<HTMLElement | null>(null);
// 获取元素bounding
const { left, top, height, width, bottom, right } =
  useElementBounding(triggerRef);
// 点击到contentRef外层关闭
onClickOutside(contentRef, () => {
  computedVisible.value = false;
});
// triggercss
const triggerCss = computed(() => {
  const offsetX = left.value;
  const offsetY = top.value + height.value;
  return {
    left: offsetX + 'px',
    top: offsetY + 'px',
  } as CSSProperties;
});
// 获取默认插槽的vNode
const slots = useSlots();
const DefaultSlot = computed(() => slots.default && slots.default()[0]);
</script>

<style lang="less" scoped>
.yc-trigger-container {
  position: fixed;
  z-index: 1001;
}
</style>
