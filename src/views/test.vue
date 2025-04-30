<template>
  <yc-layout class="container">
    <yc-layout-sider hide-trigger> </yc-layout-sider>
    <yc-layout class="main">
      <yc-layout-header class="header">
        <yc-menu
          v-model:collapsed="collapsed"
          show-collapse-button
          :popup-max-height="500"
          :mode="'horizontal'"
        >
          <template v-for="(item, index) in menus" :key="item.path">
            <yc-menu-item :path="item.path">
              <template #icon>
                <icon-apps />
              </template>
              {{ item.title }}
            </yc-menu-item>
          </template>
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
        <a-image
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          title="A user’s avatar"
          description="Present by Arco Design"
          width="260"
          footer-position="outer"
          style="margin-right: 67px; vertical-align: top"
        >
          <template #extra>
            <div class="actions">
              <span class="action"><icon-eye /></span>
              <span class="action"><icon-download /></span>
              <a-tooltip content="A user’s avatar">
                <span class="action"><icon-info-circle /></span>
              </a-tooltip>
            </div>
          </template>
        </a-image>
        <image-preview :src="images[0]" />
        <yc-image
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          title="A user’s avatar"
          description="Present by Arco Design"
          footer-position="outer"
          :width="260"
          style="margin-right: 67px; vertical-align: top"
        >
          <template #extra>
            <div class="actions">
              <span class="action"><icon-eye /></span>
              <span class="action"><icon-download /></span>
              <a-tooltip content="A user’s avatar">
                <span class="action"><icon-info-circle /></span>
              </a-tooltip>
            </div>
          </template>
        </yc-image>
      </yc-layout-content>
    </yc-layout>
  </yc-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Modal from '@/components/Modal';
import ImagePreview from '@/components/Image/ImagePreview.vue';
const size = ref(0.7);
const collapsed = ref<boolean>(false);
const menus = Array(5)
  .fill(undefined)
  .map((_, i) => {
    return {
      title: `菜单${i + 1}`,
      path: `菜单 ${i + 1}`,
      submenu:
        i == 0 ? [{ title: `子菜单`, path: `菜单${Math.random()}` }] : [],
    };
  });
const images = [
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp',
  'some-error.png',
];
const handleChange = (value: number) => {
  console.log(value);
};
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
