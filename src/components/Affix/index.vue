<template>
  <div ref="affixRef">
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
import { useElementSize } from '@vueuse/core';
import { isUndefined } from '@shared/utils/is';
import { getElement } from '@shared/utils/dom';
defineOptions({
  name: 'Affix',
});
const props = withDefaults(defineProps<AffixProps>(), {
  offseTop: 0,
  offsetBottom: undefined,
  target: () => window,
  targetContainer: '',
});
const {
  target: _target,
  targetContainer: _targetContainer,
  offseTop,
  offsetBottom,
} = toRefs(props);
// target
const target = ref<HTMLElement>();
// targetContainer
const targetContainer = ref<HTMLElement>();
// affixRef
const affixRef = ref<HTMLDivElement>();
// 固定的位置
const fixed = ref<number>(0);
// 是否固定
const isFixed = ref<boolean>(false);
// 固定样式
const style = computed<CSSProperties>(() => {
  if (!isFixed.value) return {};
  return {
    position: 'fixed',
    top: isUndefined(offsetBottom.value) ? `${fixed.value}px` : '',
    bottom: !isUndefined(offsetBottom.value) ? `${fixed.value}px` : '',
  };
});
// 容器宽高
const { width, height } = useElementSize(affixRef, undefined, {
  box: 'border-box',
});
// 处理滚动
const handleScroll = () => {
  const { top: affixTop, bottom: affixBottom } =
    affixRef.value!.getBoundingClientRect();
  const { top: targetTop, bottom: targetBottom } =
    targetContainer.value!.getBoundingClientRect();
  isFixed.value = isUndefined(offsetBottom.value)
    ? affixTop - targetTop <= offseTop.value
    : affixBottom - targetBottom >= offsetBottom.value;
  fixed.value = isUndefined(offsetBottom.value)
    ? targetTop + offseTop.value
    : offsetBottom.value;
};
onMounted(() => {
  target.value = getElement(_target.value) as HTMLElement;
  targetContainer.value = getElement(_targetContainer.value) as HTMLElement;
  if (!target.value || !targetContainer.value) return;
  target.value?.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
  target.value?.removeEventListener('scroll', handleScroll);
});
</script>
