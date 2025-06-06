<template>
  <div
    :class="[
      'yc-space',
      `yc-space-align-${align}`,
      `yc-space-direction-${direction}`,
      {
        'yc-space-wrap': wrap,
        'yc-space-fill': fill,
      },
    ]"
    :style="{
      gap,
    }"
  >
    <template v-for="(node, index) in nodes" :key="index">
      <div class="yc-space-item">
        <component :is="getSlotFunction(node as any as string)" />
      </div>
      <div
        v-if="$slots.split && index < nodes.length - 1"
        class="yc-space-split"
      >
        <slot name="split" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, useSlots, VNode } from 'vue';
import { SpaceProps, SpaceSlots } from './type';
import { isNumber, getSlotFunction } from '@shared/utils';
defineOptions({
  name: 'Space',
});
defineSlots<SpaceSlots>();
const props = withDefaults(defineProps<SpaceProps>(), {
  align: 'center',
  direction: 'horizontal',
  size: 'small',
  wrap: false,
  fill: false,
});
const { size } = toRefs(props);
// slots
const slots = useSlots();
// 计算gap
const gap = computed(() => {
  if (isNumber(size.value)) {
    return size.value + 'px';
  }
  const map = {
    mini: 4,
    small: 8,
    medium: 16,
    large: 24,
  };
  return map[size.value] + 'px';
});
// node
const nodes = computed(() => {
  const nodeArr = slots.default?.() || [];
  // 处理vfor的情况
  if (nodeArr.length == 1 && nodeArr[0].shapeFlag == 16) {
    return nodeArr[0].children as VNode[];
  }
  return nodeArr;
});
</script>

<style lang="less" scoped>
@import './style/space.less';
</style>
