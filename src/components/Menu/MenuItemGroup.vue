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
import { MenuItemGroupProps } from './type';
import useInject from './hooks/useInject';
defineOptions({
  name: 'MenuItemGroup',
});
withDefaults(defineProps<MenuItemGroupProps>(), {
  title: '',
});
const { levelIndent } = useInject();
</script>

<style lang="less" scoped>
@import './style/menu-item-group.less';
</style>
