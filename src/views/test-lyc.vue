<template>
  <div class="test">
    <yc-breadcrumb :max-count="3">
      <template #more-icon>
        <yc-tooltip content="more routes a/b/c">
          <icon-more />
        </yc-tooltip>
      </template>
      <yc-breadcrumb-item>Home</yc-breadcrumb-item>
      <yc-breadcrumb-item>Sub Home</yc-breadcrumb-item>
      <yc-breadcrumb-item>All Channel</yc-breadcrumb-item>
      <yc-breadcrumb-item>Channel</yc-breadcrumb-item>
      <yc-breadcrumb-item>News</yc-breadcrumb-item>
      <yc-breadcrumb-item>Post</yc-breadcrumb-item>
    </yc-breadcrumb>
    <yc-menu
      show-collapse-button
      :trigger-props="{
        trigger: 'click',
      }"
      mode="horizontal"
    >
      <yc-sub-menu title="菜单1" path="1">
        <template #icon>
          <icon-dashboard />
        </template>
        <yc-menu-item path="1-1"> 子菜单1-1 </yc-menu-item>
        <yc-sub-menu title="子菜单1-2" path="1-2">
          <yc-menu-item path="1-2-1">子菜单1-2-1 </yc-menu-item>
        </yc-sub-menu>
      </yc-sub-menu>
      <yc-sub-menu title="菜单2" path="2">
        <template #icon>
          <icon-dashboard />
        </template>
        <yc-menu-item path="2-1"> 子菜单2-1 </yc-menu-item>
        <yc-sub-menu title="子菜单2-2" path="2-2">
          <yc-menu-item path="2-2-1">子菜单2-2-1 </yc-menu-item>
        </yc-sub-menu>
      </yc-sub-menu>
      <yc-sub-menu title="菜单3" path="3">
        <template #icon>
          <icon-dashboard />
        </template>
        <yc-menu-item path="3-1"> 子菜单3-1 </yc-menu-item>
        <yc-sub-menu title="子菜单3-2" path="3-2">
          <yc-menu-item path="3-2-1">三层子菜单3-2-1 </yc-menu-item>
        </yc-sub-menu>
      </yc-sub-menu>
    </yc-menu>
    <a-menu
      show-collapse-button
      :trigger-props="{
        trigger: 'click',
      }"
      mode="horizontal"
    >
      <a-sub-menu title="菜单1" path="1">
        <template #icon>
          <icon-dashboard />
        </template>
        <a-menu-item path="1-1" disabled> 子菜单1-1 </a-menu-item>
        <a-sub-menu title="子菜单1-2" path="1-2">
          <a-menu-item path="1-2-1">子菜单1-2-1 </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu title="菜单2" path="2">
        <template #icon>
          <icon-dashboard />
        </template>
        <a-menu-item path="2-1"> 子菜单2-1 </a-menu-item>
        <a-sub-menu title="子菜单2-2" path="2-2">
          <a-menu-item path="2-2-1">子菜单2-2-1 </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu title="菜单3" path="3">
        <template #icon>
          <icon-dashboard />
        </template>
        <a-menu-item path="3-1"> 子菜单3-1 </a-menu-item>
        <a-sub-menu title="子菜单3-2" path="3-2">
          <a-menu-item path="3-2-1">三层子菜单3-2-1 </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
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
  background-color: aliceblue;
}
</style>
