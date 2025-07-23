<template>
  <div class="test">
    <a-space direction="vertical">
      <a-breadcrumb :max-count="3">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Sub Home</a-breadcrumb-item>
        <a-breadcrumb-item>All Channel</a-breadcrumb-item>
        <a-breadcrumb-item>Channel</a-breadcrumb-item>
        <a-breadcrumb-item>News</a-breadcrumb-item>
        <a-breadcrumb-item>Post</a-breadcrumb-item>
      </a-breadcrumb>
      <a-breadcrumb :max-count="3">
        <template #more-icon>
          <a-tooltip content="more routes a/b/c">
            <icon-more />
          </a-tooltip>
        </template>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Sub Home</a-breadcrumb-item>
        <a-breadcrumb-item>All Channel</a-breadcrumb-item>
        <a-breadcrumb-item>Channel</a-breadcrumb-item>
        <a-breadcrumb-item>News</a-breadcrumb-item>
        <a-breadcrumb-item>Post</a-breadcrumb-item>
      </a-breadcrumb>
    </a-space>
    <yc-space direction="vertical">
      <yc-breadcrumb :max-count="3">
        <yc-breadcrumb-item>Home</yc-breadcrumb-item>
        <yc-breadcrumb-item>Sub Home</yc-breadcrumb-item>
        <yc-breadcrumb-item>All Channel</yc-breadcrumb-item>
        <yc-breadcrumb-item>Channel</yc-breadcrumb-item>
        <yc-breadcrumb-item>News</yc-breadcrumb-item>
        <yc-breadcrumb-item>Post</yc-breadcrumb-item>
      </yc-breadcrumb>
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
    </yc-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const routes = ref([
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/channel',
    label: 'Channel',
  },
  {
    path: '/news',
    label: 'News',
  },
]);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
