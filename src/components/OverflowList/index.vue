<template>
  <div
    class="yc-overflow-list"
    :style="{
      gap: margin + 'px',
    }"
    ref="listRef"
  >
    <slot
      v-if="max < tags.length && from == 'end'"
      name="overflow"
      :number="tags.length - max + 1"
    >
      <yc-tag v-if="max < tags.length && from == 'end'">
        {{ `+${tags.length - max + 1}...` }}
      </yc-tag>
    </slot>

    <component
      v-for="(node, i) in tags"
      :key="i"
      :is="node"
      :style="{
        visibility: i < max - 1 ? 'visible' : 'hidden',
        position: i < max - 1 ? 'static' : 'absolute',
        left: '0',
        top: '0',
      }"
      :ref="(el: TagInstance) => (tagRef[i] = el)"
    />
    <slot
      v-if="max < tags.length && from == 'end'"
      name="overflow"
      :number="tags.length - max + 1"
    >
      <yc-tag>
        {{ `+${tags.length - max + 1}...` }}
      </yc-tag>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, VNode, watch } from 'vue';
import { toRefs, useSlots, computed } from 'vue';
import { OverflowListProps } from './type';
import { findComponentsFromVnodes, sleep } from '@shared/utils';
import { useElementSize, debouncedWatch } from '@vueuse/core';
import YcTag, { TagInstance } from '@/components/Tag';
defineOptions({
  name: 'OverflowList',
});
const props = withDefaults(defineProps<OverflowListProps>(), {
  min: 6,
  margin: 8,
  from: 'start',
});
const { min, margin, from } = toRefs(props);
// 插槽
const slots = useSlots();
// list实例
const listRef = ref<HTMLDivElement>();
// list的width
const { width } = useElementSize(listRef);
// tags
const tags = computed(() => {
  return findComponentsFromVnodes(
    slots.default?.() || [],
    YcTag.name as string
  ) as VNode[];
});
const tagRef = ref<TagInstance[]>([]);
// 最多能展示的组件数量
const max = ref<number>(min.value);
// 动态计算
watch(
  () => width.value,
  async () => {
    await sleep(0);
    let maxCount = 0;
    let totalWidth = 63;
    for (let tag of tagRef.value) {
      if (totalWidth > width.value) {
        break;
      }
      totalWidth += tag?.getRef()?.offsetWidth + margin.value;
      maxCount++;
    }
    max.value = maxCount > min.value ? maxCount : min.value;
  }
);
</script>

<style lang="less">
@import './style/overflow-list.less';
</style>
