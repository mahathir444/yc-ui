<template>
  <a-layout class="container">
    <a-layout-header
      style="background-color: rgb(242, 243, 245); height: 50px"
    />
    <a-layout class="wrapper">
      <a-layout-sider />
      <a-layout-content class="main" id="main">
        <div class="content" id="content">
          <yc-breadcrumb :max-count="3">
            <template #more-icon>
              <icon-alipay-circle />
            </template>
            <template #separator>
              <icon-align-right />
            </template>
            <yc-breadcrumb-item>测试</yc-breadcrumb-item>
            <yc-breadcrumb-item>测试1</yc-breadcrumb-item>
            <yc-breadcrumb-item>测试2</yc-breadcrumb-item>
            <yc-breadcrumb-item>测试3</yc-breadcrumb-item>
            <yc-breadcrumb-item>测试4</yc-breadcrumb-item>
            <yc-breadcrumb-item>测试5</yc-breadcrumb-item>
          </yc-breadcrumb>
          <yc-breadcrumb
            :routes="[
              {
                label: '1',
                path: '1',
              },
              {
                label: '2',
                path: '2',
              },
            ]"
          >
          </yc-breadcrumb>
          <a-breadcrumb
            :routes="[
              {
                label: '1',
                path: '1',
              },
              {
                label: '2',
                path: '2',
              },
            ]"
          >
            <a-breadcrumb-item>测试</a-breadcrumb-item>
            <a-breadcrumb-item>测试1</a-breadcrumb-item>
            <a-breadcrumb-item>测试2</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { TableColumnData } from '@arco-design/web-vue';
const value = ref('dsadsa');
const options = [
  'Bytedance',
  'Bytedesign',
  'Bytenumner',
  '1',
  '2',
  '3',
  '4',
].map((item) => {
  return {
    label: item,
    value: item,
  };
});
</script>

<style lang="less" scoped>
.container {
  height: 100%;

  .wrapper {
    height: calc(100% - 50px);
    .main {
      overflow: auto;
    }
    .content {
      height: 100%;
      // height: 300vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .content1 {
      height: 300vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
