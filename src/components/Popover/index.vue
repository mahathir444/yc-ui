<template>
  <yc-trigger
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :trigger="trigger"
    :position="position"
    :popup-container="popupContainer"
    :arrow-class="['yc-popover-popup-arrow ', arrowClass as string]"
    :arrow-style="arrowStyle"
    :content-class="['yc-popover-popup-content', contentClass as string]"
    :content-style="contentStyle"
    :popup-offset="10"
    :class="['yc-popover', 'yc-popover-popup', $attrs.class]"
    animation-name="zoom-in-fade-out"
    need-transform-origin
    show-arrow
    ref="triggerRef"
    v-bind="triggerProps"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
  >
    <slot />
    <template #content>
      <div v-if="$slots.title || title" class="yc-popover-title">
        <slot name="title"> {{ title }} </slot>
      </div>
      <div class="yc-popover-content">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  PopoverProps,
  PopoverEmits,
  PopoverSlots,
  PopoverExpose,
} from './type';
import { default as YcTrigger, TriggerInstance } from '@/components/Trigger';
defineOptions({
  name: 'Popover',
});
defineSlots<PopoverSlots>();
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
  popupContainer: undefined,
  triggerProps: () => {
    return {};
  },
});
const emits = defineEmits<PopoverEmits>();
// trigger触发器
const triggerRef = ref<TriggerInstance>();
defineExpose<PopoverExpose>({
  show() {
    triggerRef.value?.show();
  },
  hide() {
    triggerRef.value?.hide();
  },
});
</script>

<style lang="less">
@import './style/popover.less';
</style>
