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
import { toRefs } from 'vue';
import { ButtonGroupProps } from './type';
import {
  BUTTON_GROUP_SHAPE_CLASS,
  BUTTON_GROUP_STAUTS_CLASS,
} from '@shared/constants';
import useProvide from './hooks/useProvide';
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
// 获取全局配置
const { provide } = useProvide();

provide(props);
</script>

<style lang="less">
@import './style/button-group.less';
</style>
