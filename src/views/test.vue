<template>
  <yc-layout class="container">
    <yc-layout-sider hide-trigger>
      <yc-menu
        v-model:collapsed="collapsed"
        show-collapse-button
        auto-open
        style="width: 200px"
      >
        <template v-for="(item, index) in menus" :key="item.path">
          <yc-sub-menu
            v-if="item.submenu.length"
            :title="item.title"
            :path="item.path"
          >
            <template #icon>
              <icon-apps />
            </template>
            <yc-menu-item
              v-for="subItem in item.submenu"
              :key="subItem.path"
              :path="subItem.path"
            >
              {{ subItem.title }}
            </yc-menu-item>
          </yc-sub-menu>
          <yc-menu-item v-else :path="item.path">
            <template #icon>
              <icon-apps />
            </template>
            {{ item.title }}
          </yc-menu-item>
        </template>
      </yc-menu>
    </yc-layout-sider>
    <yc-layout class="main">
      <yc-layout-header class="header"> </yc-layout-header>
      <yc-layout-content class="content">
        <yc-collapse accordion>
          <yc-collapse-item
            v-for="item in menus"
            :key="item.path"
            :title="item.title"
            :value="item.path"
          >
            <div>Beijing Toutiao Technology Co., Ltd.</div>
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </yc-collapse-item>
        </yc-collapse>
        <a-collapse accordion :expand-icon-position="'right'">
          <a-collapse-item
            v-for="item in menus"
            :key="item.path"
            :header="item.title"
          >
            <div>Beijing Toutiao Technology Co., Ltd.</div>
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </a-collapse-item>
        </a-collapse>
      </yc-layout-content>
    </yc-layout>
  </yc-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const size = ref(0.7);
const collapsed = ref<boolean>(false);
const menus = Array(8)
  .fill(undefined)
  .map((_, i) => {
    return {
      title: `菜单${i + 1}`,
      path: `菜单 ${i + 1}`,
      submenu:
        i < 2
          ? new Array(3).fill(undefined).map((_, i1) => {
              return {
                title: `子菜单${i + 1}-${i1 + 1}`,
                path: `子菜单${i + 1}-${i1 + 1}`,
              };
            })
          : [],
    };
  });
</script>

<style lang="less" scoped>
.container {
  height: 100%;

  .main {
    overflow: hidden;
    // background-color: rgb(242, 243, 245);
    .header {
      height: 60px;
      border-bottom: 1px solid rgb(229, 230, 235);
    }
    .content {
      display: flex;
      justify-content: center;
      // align-items: center;
    }
  }
}
</style>
