<template>
  <footer class="yc-layout-footer">
    <slot />
  </footer>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'LayoutFooter',
});
</script>

<style lang="less" scoped>
@import './style/layout.less';
</style>
