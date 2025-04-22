<template>
  <yc-layout class="container">
    <yc-layout-sider>
      <yc-menu>
        <yc-sub-menu title="分组1">
          <yc-menu-item path="0_1-1" disabled>分组子菜单1</yc-menu-item>
          <yc-menu-item path="0_2-2">分组子菜单2</yc-menu-item>
          <yc-menu-item path="0_0-3"> 分组子菜单3 </yc-menu-item>
        </yc-sub-menu>
        <yc-menu-item path="0_1" disabled>Menu 2</yc-menu-item>
        <yc-menu-item path="0_2">Menu 3</yc-menu-item>
      </yc-menu>
    </yc-layout-sider>
    <yc-layout class="main">
      <yc-layout-header class="header"> </yc-layout-header>
      <yc-layout-content class="content">
        <a-split
          v-model:size="size"
          :min="0.2"
          :max="0.7"
          :component="'span'"
          direction="horizontal"
          style="height: 400px; width: 100%"
        >
          <template #first>
            <div style="background-color: aqua; height: 100%"></div>
          </template>
          <template #second>
            <div style="background-color: bisque; height: 100%"></div>
          </template>
        </a-split>
        <yc-split
          v-model:size="size"
          :min="0.2"
          :max="0.7"
          direction="horizontal"
          style="height: 400px; width: 100%"
        >
          <template #first>
            <div style="background-color: aqua; height: 100%"></div>
          </template>
          <template #second>
            <div style="background-color: bisque; height: 100%"></div>
          </template>
        </yc-split>
      </yc-layout-content>
    </yc-layout>
  </yc-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const index = ref(1);
const options = Array(8)
  .fill(undefined)
  .map((_, index) => ({
    value: `option${index + 1}`,
    label: `Option ${index + 1}`,
  }));

const size = ref(0.7);
</script>

<style lang="less" scoped>
.container {
  height: 100%;

  .main {
    overflow: hidden;
    background-color: rgb(242, 243, 245);
    .header {
      height: 60px;
      border-bottom: 1px solid rgb(229, 230, 235);
    }
    .content {
    }
  }
}
</style>
