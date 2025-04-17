<template>
  <header class="yc-layout-header">
    <slot />
  </header>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'LayoutHeader',
});
</script>

<style lang="less" scoped>
@import './style/layout.less';
</style>
