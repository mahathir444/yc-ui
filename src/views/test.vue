<template>
  <yc-layout class="container">
    <yc-layout-sider
      hide-trigger
      style="max-height: 100vh"
      :popup-max-height="300"
    >
      <yc-menu
        v-model:collapsed="collapsed"
        show-collapse-button
        style="width: 200px"
        :popup-max-height="500"
        :trigger-props="{
          trigger: 'click',
        }"
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
            <yc-sub-menu v-if="!index" path="11" title="通用三级">
              <yc-menu-item path="111"> 三级子级 </yc-menu-item>
            </yc-sub-menu>
          </yc-sub-menu>
          <yc-menu-item v-else :path="item.path">
            <template #icon>
              <icon-apps />
            </template>
            {{ item.title }}
          </yc-menu-item>
        </template>
      </yc-menu>
      <!-- <a-menu
        v-model:collapsed="collapsed"
        mode="pop"
        show-collapse-button
        style="width: 200px"
        :triggerProps="{
          trigger: 'click',
        }"
      >
        <template v-for="(item, index) in menus" :key="item.path">
          <a-sub-menu
            v-if="item.submenu.length"
            :title="item.title"
            :path="item.path"
            :popup="false"
            :selectable="false"
          >
            <template #icon>
              <icon-apps />
            </template>
            <a-menu-item
              v-for="subItem in item.submenu"
              :key="subItem.path"
              :path="subItem.path"
            >
              {{ subItem.title }}
            </a-menu-item>
            <a-sub-menu v-if="!index" path="11" title="通用三级">
              <a-menu-item path="111"> 三级子级 </a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-menu-item v-else :path="item.path">
            <template #icon>
              <icon-apps />
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
      </a-menu> -->
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
const menus = Array(1)
  .fill(undefined)
  .map((_, i) => {
    return {
      title: `菜单${i + 1}`,
      path: `菜单 ${i + 1}`,
      submenu:
        i < 2
          ? new Array(10).fill(undefined).map((_, i1) => {
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
