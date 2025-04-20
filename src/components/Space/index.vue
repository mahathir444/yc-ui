<template>
  <div
    :class="[
      'yc-space',
      SPACE_DIRECTION_MAP[direction],
      SPACE_ALIGN_MAP[align],
      wrap ? 'yc-space-wrap' : '',
      fill ? 'yc-space-fill' : '',
    ]"
  >
    <template v-for="(node, index) in nodes" :key="index">
      <div class="yc-space-item">
        <component :is="node" />
      </div>
      <div
        v-if="$slots.split && index < nodes!.length - 1"
        class="yc-space-split"
      >
        <slot name="split" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, useSlots } from 'vue';
import { SpaceProps } from './type';
import { SPACE_DIRECTION_MAP, SPACE_ALIGN_MAP } from '@shared/constants';
import { isNumber } from '@shared/utils';
defineOptions({
  name: 'Space',
});
const props = withDefaults(defineProps<SpaceProps>(), {
  align: 'start',
  direction: 'horizontal',
  size: 'small',
  wrap: false,
  fill: false,
});
const { size, align: alignItems } = toRefs(props);
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
const nodes = computed(() => slots.default?.());
</script>

<style lang="less" scoped>
@import './style/space.less';
.yc-space {
  gap: v-bind(gap);
}
</style>
