<template>
  <div class="yc-overflow-list">
    <yc-tag v-if="min > 0 && tags.length > min && from == 'start'">
      +{{ tags.length - min }}
    </yc-tag>
    <component
      v-for="(node, index) in tags.slice(0, min)"
      :key="index"
      :is="node"
    />
    <yc-tag v-if="min > 0 && tags.length > min && from == 'end'">
      +{{ tags.length - min }}
    </yc-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref, VNode, onMounted, onUpdated } from 'vue';
import { toRefs, useSlots, computed } from 'vue';
import { OverflowListProps } from './type';
import { ObjectData } from '@shared/type';
import YcTag from '@/components/Tag';
defineOptions({
  name: 'OverflowList',
});
const props = withDefaults(defineProps<OverflowListProps>(), {
  min: 0,
  margin: 8,
  from: 'end',
});
const { min, margin } = toRefs(props);
// 插槽
const slots = useSlots();
// gap
const gap = computed(() => `${margin.value}px`);
// tags
const tags = ref<VNode[]>([]);
// 计算tag
const calcTags = () => {
  const nodes = slots.default?.()?.[0]?.children as ObjectData[];
  return (nodes || []).filter((node) => {
    return node.type.name == YcTag.name;
  }) as VNode[];
};

onMounted(() => {
  tags.value = calcTags();
});
onUpdated(() => {
  tags.value = calcTags();
});
</script>

<style lang="less">
@import './style/overflow-list.less';
.yc-overflow-list {
  gap: v-bind(gap);
}
</style>
