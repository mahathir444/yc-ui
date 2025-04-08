<template>
  <div
    class="yc-divider"
    role="separator"
    :class="{
      'yc-divider-direction-horizontal': direction == 'horizontal',
      'yc-divider-direction-vertical': direction == 'vertical',
    }"
  >
    <div
      v-if="$slots.default && direction != 'vertical'"
      class="yc-divider-text"
      :class="{
        'yc-divider-text-left': orientation == 'left',
        'yc-divider-text-center': orientation == 'center',
        'yc-divider-text-right': orientation == 'right',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { isUndefined } from '@shared/utils/is';
import { DividerProps } from './type';
defineOptions({
  name: 'Divider',
});
const props = withDefaults(defineProps<DividerProps>(), {
  direction: 'vertical',
  orientation: 'right',
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
.yc-divider {
  min-width: v-bind(size);
  max-width: v-bind(size);
  margin: v-bind(margin);

  .yc-divider-text {
    position: absolute;
    top: 50%;
    padding: 0 16px;
    color: rgb(29, 33, 41);
    font-weight: 500;
    font-size: 14px;
    line-height: 2;
    background: #fff;
  }
}
.yc-divider-direction-horizontal {
  position: relative;
  min-width: 100%;
  max-width: 100%;
  width: 100%;
  border-bottom: v-bind(border);
}
.yc-divider-direction-vertical {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  min-height: 1em;
  min-width: 1px;
  max-width: 1px;
  border-left: v-bind(border);
}
// text
.yc-divider-text-left {
  left: 24px;
  transform: translate(0, -50%);
}
.yc-divider-text-center {
  left: 50%;
  transform: translate(-50%, -50%);
}
.yc-divider-text-right {
  right: 24px;
  transform: translate(0, -50%);
}
</style>
