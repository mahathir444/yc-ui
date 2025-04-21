<template>
  <yc-layout class="container">
    <yc-layout-sider collapsible theme="dark"></yc-layout-sider>
    <yc-layout class="main">
      <yc-layout-header class="header"> </yc-layout-header>
      <yc-layout-content class="content">
        <div class="inner">
          <!-- <yc-watermark content="李银超" grayscale>
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
        </yc-watermark> -->
          <div style="display: flex; gap: 20px">
            <a-affix
              :offset-top="0"
              target-container=".content"
              target=".content"
            >
              <a-anchor :change-hash="false" boundary="end">
                <a-anchor-link href="#basic" title="1231"></a-anchor-link>
                <a-anchor-link href="#line-less">LineLess Mode</a-anchor-link>
                <a-anchor-link href="#affix">
                  Affix
                  <template #sublist>
                    <a-anchor-link href="#boundary"
                      >Scroll Boundary</a-anchor-link
                    >
                    <a-anchor-link href="#hash">Hash mode</a-anchor-link>
                  </template>
                </a-anchor-link>
              </a-anchor>
            </a-affix>
            <a-affix
              :offset-top="0"
              target-container=".content"
              target=".content"
            >
              <yc-anchor :change-hash="false" :boundary="30" line-less>
                <yc-anchor-link href="#basic">Basic</yc-anchor-link>
                <yc-anchor-link href="#line-less">LineLess Mode</yc-anchor-link>
                <yc-anchor-link href="#affix">
                  Affix
                  <template #sublist>
                    <yc-anchor-link href="#boundary"
                      >Scroll Boundary</yc-anchor-link
                    >
                    <yc-anchor-link href="#hash">Hash mode</yc-anchor-link>
                  </template>
                </yc-anchor-link>
              </yc-anchor>
            </a-affix>
          </div>
          <div style="height: 500px" id="basic" class="target"></div>
          <div
            style="height: 500px; background-color: aqua"
            id="line-less"
            class="target"
          ></div>
          <div style="height: 500px" id="affix" class="target"></div>
          <div style="height: 500px" id="boundary" class="target"></div>
          <div style="height: 500px" id="hash" class="target"></div>
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
</script>

<style lang="less" scoped>
.container {
  height: 100%;

  .main {
    overflow: hidden;
    .header {
      height: 60px;
      border-bottom: 1px solid rgb(229, 230, 235);
    }
    .content {
      overflow: auto;

      .inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .yc-anchor {
          flex-shrink: 0;
        }
        .target {
          width: 100%;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
