<template>
  <yc-layout class="container">
    <yc-layout-sider collapsible theme="dark"></yc-layout-sider>
    <yc-layout class="main">
      <yc-layout-header class="header"> </yc-layout-header>
      <yc-layout-content>
        <!-- <a-tag color="gray" checkable>测是的撒</a-tag>
        <yc-tag color="gray" checkable>测是的撒</yc-tag>
        <yc-grid
          :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
          :colGap="12"
          :rowGap="16"
          class="grid-demo-grid"
        >
          <yc-grid-item class="demo-item">item</yc-grid-item>
          <yc-grid-item class="demo-item">item</yc-grid-item>
          <yc-grid-item class="demo-item">item</yc-grid-item>
          <yc-grid-item class="demo-item">item</yc-grid-item>
          <yc-grid-item class="demo-item">item</yc-grid-item>
          <yc-grid-item class="demo-item">item</yc-grid-item>
          <yc-grid-item class="demo-item" suffix> suffix </yc-grid-item>
        </yc-grid> -->
        <!-- <yc-watermark text="李银超" color="black" :font-size="20" grayscale>
          <div
            style="
              height: 100%;
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
        </yc-watermark> -->
        <!-- <a-verification-code
          :formatter="
            (v, i, value) => {
              console.log(v, i, value);

              return v + i + value;
            }
          "
          @change="
            (v) => {
              console.log(v);
            }
          "
        >
        </a-verification-code>
        <yc-verification-code
          :formatter="
            (v, i, value) => {
              console.log(v, i, value);
              return v + i + value;
            }
          "
        >
        </yc-verification-code> -->
        <a-button @click="index += 10">点击加10</a-button>
        <div
          style="
            height: 500px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          "
        >
          <div style="flex: 1; overflow: hidden">
            <yc-scrollbar
              :outer-style="{
                flex: 1,
              }"
              auto-fill
              style="overflow: auto; max-height: 100%"
            >
              <div
                v-for="i in index"
                :key="i"
                style="height: 40px; background-color: aqua"
              >
                {{ i }}
              </div>
            </yc-scrollbar>
          </div>
        </div>
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
