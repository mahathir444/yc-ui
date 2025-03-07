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
    :content-style="computedContentStyle"
    :popup-offset="10"
    animation-name="zoom-in-fade-out"
    show-arrow
    v-bind="$attrs"
    :wrapper-class="`yc-popover ${$attrs.wrapperClass ?? ''}`"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="(v) => (triggerPostion = v)"
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
import { ref, toRefs, computed, CSSProperties, Reactive } from 'vue';
import { TriggerPostion } from '@/packages/Trigger/type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Trigger/constants';
import { PopoverProps } from './type';
import YcTrigger from '@/packages/Trigger/index.vue';
defineOptions({
  name: 'Popover',
});
const props = withDefaults(defineProps<PopoverProps>(), {
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
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const { contentStyle } = toRefs(props);
// 当前的位置
const triggerPostion = ref<TriggerPostion>('bottom');
// content-style
const computedContentStyle = computed(() => {
  return {
    transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion.value],
    ...contentStyle?.value,
  } as CSSProperties;
});
</script>

<style lang="less">
@import './index.less';
</style>
