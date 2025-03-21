<template>
  <yc-trigger
    :popup-visible="popupVisible || undefined"
    :default-popup-visible="defaultPopupVisible"
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
    show-arrow
    need-transform-origin
    v-bind="$attrs"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
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
import { PopoverProps } from './type';
import YcTrigger from '@/components/Trigger';
defineOptions({
  name: 'Popover',
});
withDefaults(defineProps<PopoverProps>(), {
  popupVisible: undefined,
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
  popupContainer: 'body',
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
}>();
</script>

<style lang="less">
@import './style/index.less';
</style>
