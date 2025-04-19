<template>
  <div ref="wrapperRef">
    <div
      v-if="isFixed"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
      }"
    ></div>
    <div
      :class="{
        'yc-affix': isFixed,
      }"
      :style="style"
      ref="affixRef"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  toRefs,
  computed,
  onMounted,
  CSSProperties,
  onBeforeUnmount,
} from 'vue';
import { AffixProps } from './type';
import { useResizeObserver } from '@vueuse/core';
import { isUndefined } from '@shared/utils';
import { getElement } from '@shared/utils';
import { throttleByRaf } from '@shared/utils';
defineOptions({
  name: 'Affix',
});
const props = withDefaults(defineProps<AffixProps>(), {
  offsetTop: 0,
  offsetBottom: void 0,
  target: () => window,
  targetContainer: '',
});
const {
  target: _target,
  targetContainer: _targetContainer,
  offsetTop,
  offsetBottom,
} = toRefs(props);
// target
const target = ref<HTMLElement>();
// targetContainer
const targetContainer = ref<HTMLElement>();
// affixRef
const affixRef = ref<HTMLDivElement>();
// wrapperRef
const wrapperRef = ref<HTMLDivElement>();
// 是否固定
const isFixed = ref<boolean>(false);
// 固定样式
const style = ref<CSSProperties>({});
// 容器宽高
const width = ref<number>(0);
const height = ref<number>(0);
// 监听改变
useResizeObserver(
  affixRef,
  () => {
    const { width: w, height: h } = affixRef.value!.getBoundingClientRect();
    width.value = w;
    height.value = h;
    handleScroll();
  },
  {
    box: 'border-box',
  }
);
// 处理滚动
const handleScroll = throttleByRaf(() => {
  if (!target.value || !targetContainer.value || !wrapperRef.value) return;
  const { top: wrapperTop, bottom: wrapperBottom } =
    wrapperRef.value!.getBoundingClientRect();
  const { top: targetTop, bottom: targetBottom } =
    targetContainer.value!.getBoundingClientRect();
  isFixed.value = isUndefined(offsetBottom.value)
    ? wrapperTop - targetTop <= offsetTop.value
    : targetBottom - wrapperBottom <= offsetBottom.value;
  if (isFixed.value) {
    style.value = isUndefined(offsetBottom.value)
      ? { position: 'fixed', top: `${targetTop + offsetTop.value}px` }
      : { position: 'fixed', bottom: `${offsetBottom.value}px` };
  } else {
    style.value = {};
  }
});
onMounted(() => {
  target.value = getElement(_target.value as string);
  targetContainer.value = getElement(_targetContainer.value);
  target.value?.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
  target.value?.removeEventListener('scroll', handleScroll);
});
</script>
