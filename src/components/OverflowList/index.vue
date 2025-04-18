<template>
  <div
    class="yc-overflow-list"
    :style="{
      'flex-direction': from == 'start' ? 'row-reverse' : 'row',
    }"
    ref="listRef"
  >
    <div class="overflow-list-hidden">
      <component
        v-for="(node, index) in tags.slice(0, max)"
        :key="index"
        :is="node"
        :style="{
          marginRight: `${margin}px`,
        }"
        :ref="(el: TagInstance) => (tagRef[index] = el)"
      />
    </div>
    <component
      v-for="(node, index) in tags"
      v-show="index <= max"
      :key="index"
      :is="node"
      :style="{
        marginRight: `${margin}px`,
      }"
    />
    <yc-tag v-show="max < tags.length && from == 'end'">
      +{{ tags.length - max }}
    </yc-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref, VNode, nextTick } from 'vue';
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
  from: 'end',
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
debouncedWatch(
  () => width.value,
  async () => {
    await sleep(0);
    let maxCount = 0;
    let totalWidth = tagRef.value[tagRef.value.length - 1].getRef().offsetWidth;
    console.log(totalWidth, 'total');
    for (let tag of tagRef.value) {
      console.log(totalWidth, width.value, 'totalWidth');
      if (totalWidth > width.value) {
        break;
      }
      totalWidth += tag.getRef().offsetWidth + margin.value;
      maxCount++;
    }
    console.log(width.value, 'listWidth');
    console.log(maxCount, '展示的最大数量是');
    max.value = maxCount > min.value ? maxCount : min.value;
  },
  {
    debounce: 150,
  }
);
</script>

<style lang="less">
@import './style/overflow-list.less';
.overflow-list-hidden {
  position: absolute;
  visibility: hidden;
  left: 0;
  top: 0;
}
</style>
