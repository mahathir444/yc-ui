<template>
  <div
    :class="[
      'yc-button-group',
      BUTTON_GROUP_SHAPE_CLASS[type],
      BUTTON_GROUP_STAUTS_CLASS[status],
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, provide } from 'vue';
import { ButtonGroupProps, ButtonProvide } from './type';
import {
  BUTTON_GROUP_PROVIDE_KEY,
  BUTTON_GROUP_SHAPE_CLASS,
  BUTTON_GROUP_STAUTS_CLASS,
} from '@shared/constants';
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
provide<ButtonProvide>(BUTTON_GROUP_PROVIDE_KEY, {
  type,
  status,
  size,
  shape,
  disabled,
});
</script>

<style lang="less">
@import './style/button-group.less';
</style>
