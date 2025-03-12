<template>
  <div
    :class="[
      'yc-button-group',
      GROUP_SHAPE_CLASS[shape],
      GROUP_TYPE_CLASS[type],
      GROUP_STAUTS_CLASS[status],
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, provide, computed } from 'vue';
import { ButtonGroupProps } from './type';
import { SIZE_MAP } from '@/components/_constants';
import {
  GROUP_SHAPE_CLASS,
  GROUP_TYPE_CLASS,
  GROUP_STAUTS_CLASS,
} from './constants';
defineOptions({
  name: 'ButtonGroup',
});
const props = withDefaults(defineProps<ButtonGroupProps>(), {
  type: 'secondary',
  status: 'normal',
  size: 'medium',
  shape: 'square',
  disabled: false,
});
const { type, status, size, shape, disabled } = toRefs(props);
provide('type', type);
provide('status', status);
provide('size', size);
provide('shape', shape);
provide('disabled', disabled);
// 当前的size
const sizeToPx = computed(() => SIZE_MAP[size.value] + 'px');
// shape为round的borderRadius
const roundBorderRadius = computed(() => SIZE_MAP[size.value] / 2 + 'px');
</script>

<style lang="less">
@import './style/button-group.less';
// shape
.yc-button-group-shape-circle {
  .yc-button {
    width: v-bind(sizeToPx);
    padding: 0;
    &:first-child {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    }
    &:last-child {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }
  }
}
.yc-button-group-shape-round {
  .yc-button {
    &:first-child {
      border-top-left-radius: v-bind(roundBorderRadius);
      border-bottom-left-radius: v-bind(roundBorderRadius);
    }
    &:last-child {
      border-top-right-radius: v-bind(roundBorderRadius);
      border-bottom-right-radius: v-bind(roundBorderRadius);
    }
  }
}
</style>
