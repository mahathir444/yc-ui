<template>
  <yc-trigger
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :popup-container="popupContainer"
    :position="position"
    :arrow-class="['yc-tooltip-popup-arrow', arrowClass as string]"
    :arrow-style="contentStyle"
    :content-class="[
      'yc-tooltip-popup-content',
      contentClass as string,
      {
        'yc-tooltip-mini': mini,
      },
    ]"
    :content-style="arrowStyle"
    :popup-offset="10"
    :class="['yc-tooltip', 'yc-tooltip-popup', $attrs.class]"
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
      <slot name="content">
        {{ content }}
      </slot>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { toRefs, computed, CSSProperties } from 'vue';
import {
  TooltipProps,
  TooltipEmits,
  TooltipSlots,
  TooltipExpose,
} from './type';
import { default as YcTrigger, TriggerInstance } from '@/components/Trigger';
defineOptions({
  name: 'Tooltip',
});
defineSlots<TooltipSlots>();
const props = withDefaults(defineProps<TooltipProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  content: '',
  position: 'bottom',
  mini: false,
  backgroundColor: 'rgb(29,33,41)',
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
const emits = defineEmits<TooltipEmits>();
const {
  arrowStyle: _arrowStyle,
  contentStyle: _contentStyle,
  backgroundColor,
} = toRefs(props);
// content-style
const contentStyle = computed(() => {
  return {
    backgroundColor: backgroundColor.value,
    ..._contentStyle.value,
  } as CSSProperties;
});
// arrowStyle
const arrowStyle = computed(() => {
  return {
    backgroundColor: backgroundColor.value,
    ..._arrowStyle.value,
  };
});
// triggerRef
const triggerRef = ref<TriggerInstance>();
defineExpose<TooltipExpose>({
  show() {
    triggerRef.value?.show();
  },
  hide() {
    triggerRef.value?.hide();
  },
});
</script>

<style lang="less">
@import './style/tooltip.less';
</style>
