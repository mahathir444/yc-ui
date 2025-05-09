<template>
  <main class="yc-layout-content">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { LayoutContentSlots } from './type';
defineOptions({
  name: 'LayoutContent',
});
defineSlots<LayoutContentSlots>();
</script>

<style lang="less" scoped>
@import './style/layout.less';
</style>
