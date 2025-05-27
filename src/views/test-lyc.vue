<template>
  <div class="test">
    <yc-breadcrumb :max-count="3">
      <yc-breadcrumb-item>Home</yc-breadcrumb-item>
      <yc-breadcrumb-item>Sub Home</yc-breadcrumb-item>
      <yc-breadcrumb-item>All Channel</yc-breadcrumb-item>
      <yc-breadcrumb-item>Channel</yc-breadcrumb-item>
      <yc-breadcrumb-item>News</yc-breadcrumb-item>
      <yc-breadcrumb-item>Post</yc-breadcrumb-item>
    </yc-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref(5);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
