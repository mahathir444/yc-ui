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
import { toRefs, provide } from 'vue';
import { ButtonGroupProps, ButtonProvide } from './type';
import { GROUP_TYPE_CLASS, GROUP_STAUTS_CLASS } from '@shared/constants/button';
import { BUTTON_GROUP_PROVIDE_KEY } from '@shared/constants';
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
