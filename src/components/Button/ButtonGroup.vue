<template>
  <div
    :class="[
      'yc-button-group',
      `yc-button-group-${type}`,
      `yc-button-group-status-${status}`,
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ButtonGroupProps, ButtonGroupSlots } from './type';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'ButtonGroup',
});
defineSlots<ButtonGroupSlots>();
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
