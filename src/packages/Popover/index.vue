<template>
  <yc-trigger
    v-bind="props"
    wrapper-class="yc-popover"
    :arrow-class="`yc-popover-popup-arrow ${arrowClass}`"
    :content-class="`yc-popover-popup-content ${contentClass}`"
    :content-style="{
      transformOrigin: TRANSFORM_ORIGIN_MAP[popoverPosition],
      ...contentStyle,
    }"
    :popup-translate="popoverTranslate"
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
        <template v-else-if="!$slots.title && title">{{ title }}</template>
      </div>
      <div class="'yc-popover-content'">
        <slot v-if="$slots.content" name="content" />
        <template v-else-if="!$slots.content && content">
          {{ content }}
        </template>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { computed, toRefs, ref } from 'vue';
import { TRANSFORM_ORIGIN_MAP } from './constants';
import { TriggerPostion } from '../Trigger/type';
import { PopoverProps } from './type';
import YcTrigger from '../Trigger/index.vue';
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
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const { arrowClass, popupTranslate } = toRefs(props);
// 当前的位置
const popoverPosition = ref<TriggerPostion>('bottom');
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
    }
  }
}
</style>
