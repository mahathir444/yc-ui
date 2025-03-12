<template>
  <div
    :class="[
      'yc-button-group',
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
</script>

<style lang="less">
@import './style/button-group.less';
</style>
