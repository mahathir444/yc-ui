<template>
  <div
    class="yc-overflow-list"
    :style="{
      gap: margin + 'px',
      padding:
        from == 'start'
          ? `0 0 0 ${overFlowWidth}px`
          : ` 0 ${overFlowWidth}px 0 0`,
    }"
    ref="listRef"
  >
    <slot />
    <slot name="overflow" :number="overflowNumber">
      <yc-tag
        v-if="max < index"
        :style="{
          visibility: max < index ? 'visible' : 'hidden',
          position: max < index ? 'static' : 'absolute',
          left: from == 'start' ? '0' : '',
          right: from == 'end' ? '0' : '',
        }"
        is-overflow
        ref="overflowRef"
      >
        {{ `+${overflowNumber}` }}
      </yc-tag>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs, computed, onBeforeUnmount, Ref } from 'vue';
import {
  OverflowListProps,
  OverflowListEmits,
  OverflowListSlots,
} from './type';
import { throttle, sleep, unrefElement } from '@shared/utils';
import { useResizeObserver } from '@vueuse/core';
import useContext from './hooks/useContext';
import { default as YcTag } from '@/components/Tag';
defineOptions({
  name: 'OverflowList',
});
defineSlots<OverflowListSlots>();
const props = withDefaults(defineProps<OverflowListProps>(), {
  min: 0,
  margin: 8,
  from: 'end',
});
const emits = defineEmits<OverflowListEmits>();
const { min, margin, from } = toRefs(props);
// 注入数据
const { provide } = useContext();
const { max, index, widths } = provide();
// list实例
const listRef = ref<HTMLDivElement>();
// 溢出tag的宽度
const overflowRef = ref();
// 溢出宽度
const overFlowWidth = computed(() => {
  if (!overflowRef.value) return margin.value;
  return (
    (unrefElement(overflowRef) as HTMLDivElement).offsetWidth + margin.value
  );
});
// 溢出数量
const overflowNumber = computed(() => {
  return index.value - max.value;
});
// 动态计算
const { stop } = useResizeObserver(
  listRef,
  throttle(async () => {
    await sleep(0);
    const width = listRef.value!.offsetWidth;
    let maxCount = 0;
    let totalWidth = 0;
    for (let i = 0; i < widths.value.length; i++) {
      const gap = i > 0 ? margin.value : 0;
      const newWidth = totalWidth + gap + widths.value[i];
      if (newWidth > width) {
        break;
      }
      totalWidth = newWidth;
      maxCount++;
    }
    max.value = maxCount > min.value ? maxCount : min.value;
  }, 100)
);
// 检测max的改变触发change事件
watch(
  () => max.value,
  () => {
    emits('change', overflowNumber.value);
  }
);

onBeforeUnmount(() => {
  stop();
});
</script>

<style lang="less" scoped>
@import './style/overflow-list.less';
</style>
