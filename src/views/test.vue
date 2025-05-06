<template>
  <yc-layout class="container">
    <yc-layout-sider hide-trigger>
      <yc-menu
        v-model:collapsed="collapsed"
        show-collapse-button
        style="max-height: 100%; overflow: auto"
      >
        <yc-sub-menu title="层级1" path="321">
          <template #icon>
            <icon-dashboard />
          </template>
          <yc-sub-menu title="层级2" path="3221">
            <yc-menu-item
              v-for="item in menus"
              :key="item.path + '1'"
              :path="item.path + '1'"
            >
              {{ '层级3' + item.title }}
            </yc-menu-item>
          </yc-sub-menu>
          <yc-menu-item
            v-for="item in menus"
            :key="item.path"
            :path="item.path"
          >
            {{ item.title }}
          </yc-menu-item>
        </yc-sub-menu>
      </yc-menu>
    </yc-layout-sider>
    <yc-layout class="main">
      <yc-layout-header class="header">
        <yc-menu :popup-max-height="500" mode="horizontal">
          <yc-sub-menu title="层级1" path="321">
            <template #icon>
              <icon-dashboard />
            </template>
            <yc-menu-item
              v-for="item in menus"
              :key="item.path"
              :path="item.path"
            >
              {{ item.title }}
            </yc-menu-item>
            <yc-sub-menu title="层级2" path="3221">
              <yc-menu-item
                v-for="item in menus"
                :key="item.path + '1'"
                :path="item.path + '1'"
              >
                {{ '层级3' + item.title }}
              </yc-menu-item>
            </yc-sub-menu>
          </yc-sub-menu>
          <yc-menu-item
            v-for="item in menus"
            :key="item.path"
            :path="item.path"
          >
            {{ item.title }}
          </yc-menu-item>
        </yc-menu>
      </yc-layout-header>
      <yc-layout-content class="content">
        <!-- <a-carousel
          :style="{
            width: '600px',
            height: '240px',
          }"
          animation-name="slide"
          show-arrow="never"
          indicator-position="outer"
          @change="handleChange"
        >
          <a-carousel-item v-for="image in images">
            <img
              :src="image"
              :style="{
                width: '100%',
                height: '100%',
              }"
            />
          </a-carousel-item>
        </a-carousel>
        <yc-carousel
          :style="{
            width: '600px',
            height: '240px',
          }"
          animation-name="slide"
          show-arrow="never"
          indicator-position="outer"
          @change="handleChange"
        >
          <yc-carousel-item v-for="image in images">
            <img
              :src="image"
              :style="{
                width: '100%',
                height: '100%',
              }"
            />
          </yc-carousel-item>
        </yc-carousel> -->
        <yc-input-number placeholder="input-number" />
        <yc-slider
          show-input
          :min="30"
          :max="100"
          :marks="{
            10: '10km',
            30: '30km',
            60: '60km',
            90: '90km',
          }"
        />
      </yc-layout-content>
    </yc-layout>
  </yc-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const collapsed = ref<boolean>(false);
const menus = Array(5)
  .fill(undefined)
  .map((_, i) => {
    return {
      title: `菜单${i + 1}`,
      path: `菜单 ${i + 1}`,
    };
  });
const images = [
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp',
];
const options = ref<any[]>([]);
for (let i = 0; i < 30; i++) {
  options.value.push({
    label: '选项' + i,
    value: i,
  });
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;

  .main {
    overflow: hidden;
    // background-color: rgb(242, 243, 245);
    .header {
      // height: 200px;
      border-bottom: 1px solid rgb(229, 230, 235);
    }
    .content {
      display: flex;
      gap: 4px;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
  }
}
</style>
