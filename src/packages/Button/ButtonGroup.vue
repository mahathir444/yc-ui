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
import { SIZE_MAP } from '@/packages/_constants';
import {
  GROUP_SHAPE_CLASS,
  GROUP_TYPE_CLASS,
  GROUP_STAUTS_CLASS,
} from './constants';
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
.yc-button-group {
  display: flex;
  align-items: center;

  .yc-button {
    flex-shrink: 0;
    border-radius: 0;
    &:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    &:last-child {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      border-right: none;
    }
  }
}
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
.yc-button-group-primary,
.yc-button-group-secondary,
.yc-button-group-text {
  &.yc-button-group-primary {
    .yc-button:not(:last-child) {
      border-right: 1px solid rgb(64, 128, 255);
    }
  }
  &.yc-button-group-secondary {
    .yc-button:not(:last-child) {
      border-right: 1px solid rgb(229, 230, 235);
    }
  }
  //   warning
  &.yc-button-group-status-warning {
    .yc-button:not(:last-child) {
      border-right: 1px solid rgb(255, 154, 46);
    }
  }
  //   success
  &.yc-button-group-status-success {
    .yc-button:not(:last-child) {
      border-right: 1px solid rgb(35, 195, 67);
    }
  }
  //   danger
  &.yc-button-group-status-danger {
    .yc-button:not(:last-child) {
      border-right: 1px solid rgb(247, 101, 96);
    }
  }
}
.yc-button-group-dashed,
.yc-button-group-outline {
  .yc-button:not(:first-child) {
    border-left: none;
  }
}
</style>
