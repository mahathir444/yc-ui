<template>
  <yc-trigger
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :popup-container="popupContainer"
    :position="position"
    :arrow-class="`yc-tooltip-popup-arrow ${arrowClass}`"
    :arrow-style="computedArrowStyle"
    :content-class="`yc-tooltip-popup-content ${contentClass} ${mini ? 'yc-tooltip-mini' : ''}`"
    :content-style="computedContentStyle"
    :popup-offset="10"
    animation-name="zoom-in-fade-out"
    show-arrow
    v-bind="$attrs"
    :wrapper-class="`yc-tooltip ${$attrs.wrapperClass ?? ''}`"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="(v) => (triggerPostion = v)"
  >
    <slot />
    <template #content>
      <div>
        <slot name="content" />
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, CSSProperties } from 'vue';
import { TriggerPostion } from '@/components/Trigger/type';
import { TooltipProps } from './type';
import { TRANSFORM_ORIGIN_MAP } from '@/components/Trigger/constants';
import YcTrigger from '@/components/Trigger/index.vue';
defineOptions({
  name: 'Tooltip',
});
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
  popupContainer: 'body',
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const { arrowStyle, contentStyle, backgroundColor } = toRefs(props);
// 当前的位置
const triggerPostion = ref<TriggerPostion>('bottom');
// content-style
const computedContentStyle = computed(() => {
  return {
    transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion.value],
    backgroundColor: backgroundColor.value,
    ...contentStyle.value,
  } as CSSProperties;
});
// arrowStyle
const computedArrowStyle = computed(() => {
  return {
    backgroundColor: backgroundColor.value,
    ...arrowStyle.value,
  };
});
</script>

<style lang="less">
@import './index.less';
</style>
