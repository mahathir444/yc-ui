<template>
  <div class="yc-menu-group">
    <div class="yc-menu-group-title text-ellipsis">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div
      class="yc-menu-group-content"
      :style="{
        paddingLeft: levelIndent + 'px',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MenuItemGroupProps, MenuItemGroupSlots } from './type';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'MenuItemGroup',
});
defineSlots<MenuItemGroupSlots>();
withDefaults(defineProps<MenuItemGroupProps>(), {
  title: '',
});
// 接收menu注入
const { inject } = useProvide();
const { levelIndent } = inject();
</script>

<style lang="less" scoped>
@import './style/menu-item-group.less';
</style>
