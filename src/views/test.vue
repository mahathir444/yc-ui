<template>
  <a-layout class="container">
    <a-layout-header
      style="background-color: rgb(242, 243, 245); height: 50px"
    />
    <a-layout class="wrapper">
      <a-layout-sider />
      <a-layout-content class="main" id="main">
        <div class="content" id="content">
          <div style="width: 600px; display: flex">
            <a-affix
              :offset-top="20"
              :offset-bottom="20"
              target="#main"
              target-container="#main"
            >
              <yc-button type="primary">测试</yc-button>
            </a-affix>
            <yc-affix
              :offse-top="20"
              :offset-bottom="20"
              target="#main"
              target-container="#main"
            >
              <yc-button type="primary">测试</yc-button>
            </yc-affix>
          </div>
          <div style="width: 600px; display: flex">
            <yc-skeleton loading>
              <yc-skeleton-line :rows="3" />
              <yc-skeleton-shape />
            </yc-skeleton>
            <a-skeleton loading animation>
              <a-skeleton-line :rows="3" />
              <a-skeleton-shape />
            </a-skeleton>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
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
  }
}

.content {
  height: 400vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
