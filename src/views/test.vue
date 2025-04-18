<template>
  <yc-layout class="container">
    <yc-layout-sider collapsible theme="dark"></yc-layout-sider>
    <yc-layout class="main">
      <yc-layout-header class="header"> </yc-layout-header>
      <yc-layout-content>
        <yc-row class="grid-demo" align="start">
          <yc-col
            :span="{
              xs: 4,
              sm: 8,
              md: 12,
              lg: 16,
              xl: 20,
              xxl: 24,
            }"
          >
            <div>ResponsiveValue</div>
          </yc-col>
        </yc-row>
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
      </yc-layout-content>
    </yc-layout>
  </yc-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const options = Array(8)
  .fill(undefined)
  .map((_, index) => ({
    value: `option${index + 1}`,
    label: `Option ${index + 1}`,
  }));
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
.grid-demo {
  width: 100%;
  background-color: (rgb(242, 243, 245));
  margin-bottom: 40px;
}
.grid-demo:last-child {
  margin-bottom: 0px;
}
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: #fff;
  text-align: center;
}
.grid-demo .yc-col:nth-of-type(1) {
  height: 90px;
  line-height: 90px;
}
.grid-demo .yc-col:nth-of-type(2) {
  height: 48px;
  line-height: 48px;
}
.grid-demo .yc-col:nth-of-type(3) {
  height: 120px;
  line-height: 120px;
}
.grid-demo .yc-col:nth-of-type(4) {
  height: 60px;
  line-height: 60px;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: blue;
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: pink;
}
</style>
