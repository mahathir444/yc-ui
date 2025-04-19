<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :trigger="trigger"
    :position="position"
    :popup-container="popupContainer"
    :arrow-class="`yc-popover-popup-arrow ${arrowClass}`"
    :arrow-style="arrowStyle"
    :content-class="`yc-popover-popup-content ${contentClass}`"
    :content-style="contentStyle"
    :popup-offset="10"
    :class="`yc-popover ${$attrs.class}`"
    animation-name="zoom-in-fade-out"
    need-transform-origin
    show-arrow
    v-bind="$attrs"
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
import { toRefs } from 'vue';
import { PopoverProps } from './type';
import YcTrigger from '@/components/Trigger';
import { useControlValue } from '@shared/hooks';
defineOptions({
  name: 'Popover',
});
const props = withDefaults(defineProps<PopoverProps>(), {
  popupVisible: void 0,
  defaultPopupVisible: false,
  title: '',
  content: '',
  trigger: 'hover',
  position: 'bottom',
  contentClass: '',
  contentStyle: () => {
    return {};
  },
  arrowClass: '',
  arrowStyle: () => {
    return {};
  },
  popupContainer: void 0,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
}>();
const { popupVisible, defaultPopupVisible } = toRefs(props);
// 受控的visible
const computedVisible = useControlValue<boolean>(
  popupVisible,
  defaultPopupVisible.value,
  (val) => {
    emits('update:popupVisible', val);
    emits('popup-visible-change', val);
  }
);
</script>

<style lang="less">
@import './style/popover.less';
</style>
