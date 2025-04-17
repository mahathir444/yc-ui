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
import { useConfigProvder } from '@shared/hooks';
defineOptions({
  name: 'ButtonGroup',
});
const props = withDefaults(defineProps<ButtonGroupProps>(), {
  type: 'secondary',
  status: 'normal',
  size: undefined,
  shape: 'square',
  disabled: false,
});
const { type, status, shape, disabled } = toRefs(props);
// 获取全局配置
const { size } = useConfigProvder(props);
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
