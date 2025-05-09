<template>
  <footer class="yc-layout-footer">
    <slot />
  </footer>
</template>

<script lang="ts" setup>
import { LayoutFooterSlots } from './type';
defineOptions({
  name: 'LayoutFooter',
});
defineSlots<LayoutFooterSlots>();
</script>

<style lang="less" scoped>
@import './style/layout.less';
</style>
