<template>
  <main class="yc-layout-content">
    <slot />
  </main>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Content',
});
</script>

<style lang="less" scoped>
.yc-layout-content {
  flex: 1;
}
</style>
