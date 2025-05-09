<template>
  <div
    role="separator"
    :class="['yc-divider', DIVIDER_DIRECTION_MAP[direction]]"
  >
    <div
      v-if="$slots.default && direction != 'vertical'"
      :class="['yc-divider-text', DIVIDER_POSITION_MAP[orientation]]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { DividerProps, DividerSlots } from './type';
import { DIVIDER_DIRECTION_MAP, DIVIDER_POSITION_MAP } from '@shared/constants';
import { isUndefined } from '@shared/utils';
defineOptions({
  name: 'Divider',
});
defineSlots<DividerSlots>();
const props = withDefaults(defineProps<DividerProps>(), {
  direction: 'horizontal',
  orientation: 'left',
  type: 'solid',
  size: 1,
  margin: undefined,
});
const { size, margin: _margin, direction, type } = toRefs(props);
const margin = computed(() => {
  if (isUndefined(_margin.value)) {
    return direction.value == 'horizontal' ? '20px 0' : '0 12px';
  }
  return direction.value == 'horizontal'
    ? `${_margin.value}px 0`
    : `0 ${_margin.value}px `;
});
// border
const border = computed(
  () => `${size.value}px ${type.value} rgb(229, 230, 235)`
);
</script>

<style lang="less" scoped>
@import './style/divider.less';
.yc-divider {
  margin: v-bind(margin);
  &.yc-divider-direction-horizontal {
    border-bottom: v-bind(border);
  }
  &.yc-divider-direction-vertical {
    border-left: v-bind(border);
  }
}
</style>
