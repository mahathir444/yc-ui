<template>
  <yc-layout class="container">
    <yc-layout-sider
      collapsible
      theme="dark"
      :resize-directions="['right']"
    ></yc-layout-sider>
    <yc-layout class="main">
      <yc-layout-header class="header"> </yc-layout-header>
      <yc-layout-content>
        <yc-watermark content="李银超" grayscale>
          <div
            style="
              width: 500px;
              height: 500px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <h2>受保护的内容区域</h2>
            <p>这里的内容会被添加水印保护</p>
            <p>支持文字和图片两种水印类型</p>
            <p>可以调整各种水印参数</p>
          </div>
        </yc-watermark>
        <a-watermark content="李银超" grayscale>
          <div
            style="
              width: 500px;
              height: 500px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <h2>受保护的内容区域</h2>
            <p>这里的内容会被添加水印保护</p>
            <p>支持文字和图片两种水印类型</p>
            <p>可以调整各种水印参数</p>
          </div>
        </a-watermark>
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
const routes = [
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
  {
    path: '/news1',
    label: 'News1',
  },
];
</script>

<style lang="less" scoped>
.container {
  height: 100%;

  .main {
    overflow: auto;
    .header {
      height: 60px;
      border-bottom: 1px solid rgb(229, 230, 235);
    }
    .content {
      height: calc(100% - 60px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<style lang="less">
.grid-demo-grid .demo-item,
.grid-demo-grid .demo-suffix {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo-grid .demo-item:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo-grid .demo-item:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
