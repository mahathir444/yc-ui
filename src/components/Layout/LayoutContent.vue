<template>
  <main class="yc-layout-content">
    <slot />
  </main>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'LayoutContent',
});
</script>

<style lang="less" scoped>
@import './style/layout.less';
</style>
