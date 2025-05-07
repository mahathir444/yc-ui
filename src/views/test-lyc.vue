<template>
  <div class="test">
    <yc-menu mode="horizontal" default-selected-keys="1">
      <yc-sub-menu path="s">
        <template #title> 测试 </template>
        <yc-menu-item path="5">Solution</yc-menu-item>
        <yc-menu-item path="6">Cloud Service</yc-menu-item>
        <yc-menu-item path="7">Cooperation</yc-menu-item>
      </yc-sub-menu>
      <yc-menu-item path="2">Solution</yc-menu-item>
      <yc-menu-item path="3">Cloud Service</yc-menu-item>
      <yc-menu-item path="4">Cooperation</yc-menu-item>
    </yc-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
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
