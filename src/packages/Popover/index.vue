<template>
  <yc-trigger
    v-bind="props"
    :class="['yc-popover', $attrs.class]"
    :arrow-class="popoverArrowClass"
    :arrow-style="popoverArrowStyle"
    :content-class="popoverContentClass"
    :content-style="popoverContentStyle"
    :popup-translate="popoverTranslate"
    :trigger-dom="defaultSlot"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="(v) => (popoverPosition = v)"
  >
    <slot />
    <template #content>
      <div v-if="$slots.title" class="yc-popover-title">
        <slot v-if="$slots.title" name="title" />
        <template v-else="!$slots.title && title">{{ title }}</template>
      </div>
      <div class="yc-popover-content">
        <slot v-if="$slots.content" name="content" />
        <template v-else="!$slots.content && content">{{ content }}</template>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { computed, toRefs, ref, CSSProperties, useSlots, h } from 'vue';
import YcTrigger from '../Trigger/index.vue';
import { TriggerPostion } from '../Trigger/type';
import { PopoverProps } from './type';
defineOptions({
  name: 'Popover',
});
const props = withDefaults(defineProps<PopoverProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  popupContainer: 'body',
  renderToBody: false,
  position: 'bottom',
  disabled: false,
  popupTranslate: undefined,
  showArrow: true,
  alignPoint: false,
  blurToClose: true,
  clickOutsidetoClose: true,
  clickToClose: true,
  unmountOnClose: false,
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
  title: '',
  content: '',
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const { arrowStyle, arrowClass, contentStyle, contentClass, popupTranslate } =
  toRefs(props);
// 获取默认插槽的vNode
const slots = useSlots();
const defaultSlot = computed(() => {
  if (slots?.default?.()?.length) {
    return slots.default()[0];
  } else {
    return h('span', null, '');
  }
});
// 当前的位置
const popoverPosition = ref<TriggerPostion>('bottom');
// popover-arrow-class
const popoverArrowClass = computed(() =>
  [arrowClass.value, 'yc-popover-popup-arrow'].map((item) => item).join(' ')
);
// popover-arrow-style
const popoverArrowStyle = computed(() => {
  // 设置 border
  const border = {
    borderTop:
      popoverPosition.value.startsWith('r') ||
      popoverPosition.value.startsWith('t')
        ? 'none'
        : '',
    borderRight:
      popoverPosition.value.startsWith('r') ||
      popoverPosition.value.startsWith('b')
        ? 'none'
        : '',
    borderBottom:
      popoverPosition.value.startsWith('l') ||
      popoverPosition.value.startsWith('b')
        ? 'none'
        : '',
    borderLeft:
      popoverPosition.value.startsWith('l') ||
      popoverPosition.value.startsWith('t')
        ? 'none'
        : '',
  };
  return {
    ...arrowStyle.value,
    ...border,
  } as CSSProperties;
});
// popover-content-class
const popoverContentClass = computed(() =>
  [contentClass.value, 'yc-popover-popup-content'].map((item) => item).join(' ')
);
// popover-content-style
const popoverContentStyle = computed(() => {
  // 设置transform-origin
  const originMap = {
    rt: '0 0',
    right: '0 50%',
    rb: '0 100%',
    lt: '100% 0',
    left: '100% 50%',
    lb: '100% 100%',
    tl: '0 100%',
    top: '50% 100%',
    tr: '100% 100%',
    bl: '0 0',
    bottom: '50% 0',
    br: '100% 0',
  };
  return {
    ...contentStyle.value,
    transformOrigin: originMap[popoverPosition.value],
  } as CSSProperties;
});
// popover-translate
const popoverTranslate = computed(() => {
  if (popupTranslate.value) return popupTranslate.value;
  if (popoverPosition.value.startsWith('t')) {
    return [0, -10];
  } else if (popoverPosition.value.startsWith('b')) {
    return [0, 10];
  } else if (popoverPosition.value.startsWith('l')) {
    return [-10, 0];
  } else {
    return [10, 0];
  }
});
</script>

<style lang="less">
.yc-popover {
  .yc-popover-popup-content {
    padding: 12px 16px;
    color: rgb(78, 89, 105);
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    border: 1px solid rgb(229, 230, 235);
    border-radius: 4px;
    box-shadow: 0 4px 10px #0000001a;
    .yc-popover-title {
      color: rgb(29, 33, 41);
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 4px;
    }
  }
  .yc-trigger-arrow {
    &.yc-popover-popup-arrow {
      z-index: 1;
      border: 1px solid rgb(229, 230, 235);
      width: 8px;
      height: 8px;
    }
  }
}
</style>
