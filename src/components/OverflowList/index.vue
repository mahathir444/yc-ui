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
        v-if="max < widths.length"
        :style="{
          visibility: max < widths.length ? 'visible' : 'hidden',
          position: max < widths.length ? 'static' : 'absolute',
          left: from == 'start' ? '0' : '',
          right: from == 'end' ? '0' : '',
        }"
        ref="overflowRef"
      >
        {{ `+${overflowNumber}` }}
      </yc-tag>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, onBeforeUnmount } from 'vue';
import {
  OverflowListProps,
  OverflowListEmits,
  OverflowListSlots,
} from './type';
import { throttle, sleep } from '@shared/utils';
import { useResizeObserver } from '@vueuse/core';
import { default as YcTag, TagInstance } from '@/components/Tag';
import useContext from './hooks/useContext1';
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
const { max, widths } = provide();
// list实例
const listRef = ref<HTMLDivElement>();
// 溢出tag的宽度
const overflowRef = ref<TagInstance>();
// 溢出宽度
const overFlowWidth = computed(
  () => (overflowRef.value?.getRef()?.offsetWidth || 0) + margin.value
);
// 溢出数量
const overflowNumber = computed(() => {
  return widths.value.length - max.value;
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
      totalWidth += newWidth;
      maxCount++;
    }
    max.value = maxCount > min.value ? maxCount : min.value;
    console.log(max.value, 'max');
    emits('change', overflowNumber.value);
  }, 100)
);

onBeforeUnmount(() => {
  stop();
});
</script>

<style lang="less" scoped>
@import './style/overflow-list.less';
</style>
