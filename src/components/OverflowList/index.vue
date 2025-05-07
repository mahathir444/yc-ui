<template>
  <div
    class="yc-overflow-list"
    :style="{
      gap: margin + 'px',
      padding:
        from == 'start'
          ? `0 0 0 ${overFlowWidth}px`
          : ` 0 ${overFlowWidth}px 0 -`,
    }"
    ref="listRef"
  >
    <component
      v-for="(node, i) in tags"
      :key="i"
      :is="node"
      :style="{
        visibility: i < max ? 'visible' : 'hidden',
        position: i < max ? 'static' : 'absolute',
      }"
      :ref="(el: TagInstance) => (tagRef[i] = el)"
    />

    <slot name="overflow" :number="overflowNumber">
      <yc-tag
        v-if="max < tags.length"
        :style="{
          visibility: max < tags.length ? 'visible' : 'hidden',
          position: max < tags.length ? 'static' : 'absolute',
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
import { ref, VNode } from 'vue';
import { toRefs, useSlots, computed } from 'vue';
import { OverflowListProps, OverflowListEmits } from './type';
import { findComponentsFromVnodes, throttle } from '@shared/utils';
import { useResizeObserver } from '@vueuse/core';
import YcTag, { TagInstance } from '@/components/Tag';
defineOptions({
  name: 'OverflowList',
});
const props = withDefaults(defineProps<OverflowListProps>(), {
  min: 0,
  margin: 8,
  from: 'end',
});
const emits = defineEmits<OverflowListEmits>();
const { min, margin, from } = toRefs(props);
// 插槽
const slots = useSlots();
// list实例
const listRef = ref<HTMLDivElement>();
// tags
const tags = computed(() => {
  return findComponentsFromVnodes(
    slots.default?.() || [],
    YcTag.name as string
  ) as VNode[];
});
const tagRef = ref<TagInstance[]>([]);
// 溢出tag的宽度
const overflowRef = ref<TagInstance>();
// 溢出宽度
const overFlowWidth = computed(
  () => (overflowRef.value?.getRef()?.offsetWidth || 0) + margin.value
);
// 溢出数量
const overflowNumber = computed(() => {
  return tags.value.length - max.value;
});
// 最多能展示的组件数量
const max = ref<number>(min.value);
// 动态计算
useResizeObserver(
  listRef,
  throttle(() => {
    const width = listRef.value!.offsetWidth;
    let maxCount = 0;
    let totalWidth = 0;
    for (let i = 0; i < tagRef.value.length; i++) {
      console.log(tagRef.value[i]?.getRef()?.offsetWidth, 'width');
    }
    for (let i = 0; i < tagRef.value.length; i++) {
      const gap = i > 0 ? margin.value : 0;
      const newWidth =
        totalWidth + gap + tagRef.value[i]?.getRef()?.offsetWidth;
      if (newWidth > width) {
        break;
      }
      totalWidth += newWidth;
      maxCount++;
    }
    max.value = maxCount > min.value ? maxCount : min.value;
    emits('change', overflowNumber.value);
  }, 100)
);
</script>

<style lang="less" scoped>
@import './style/overflow-list.less';
</style>
