<template>
  <yc-layout class="container">
    <yc-layout-sider
      hide-trigger
      style="max-height: 100vh"
      :popup-max-height="300"
    >
      <!-- <yc-menu
        v-model:collapsed="collapsed"
        show-collapse-button
        :popup-max-height="500"
      >
        <template v-for="(item, index) in menus" :key="item.path">
          <yc-menu-item :path="item.path">
            <template #icon>
              <icon-apps />
            </template>
            {{ item.title }}
          </yc-menu-item>
        </template>
      </yc-menu> -->
    </yc-layout-sider>
    <yc-layout class="main">
      <yc-layout-header
        class="header"
        style="display: flex; flex-direction: column"
      >
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
        <a-menu
          v-model:collapsed="collapsed"
          mode="horizontal"
          show-collapse-button
          style="width: 100%"
          :triggerProps="{
            trigger: 'click',
          }"
        >
          <template v-for="(item, index) in menus" :key="item.path">
            <a-menu-item :path="item.path">
              <template #icon>
                <icon-apps />
              </template>
              {{ item.title }}
            </a-menu-item>
          </template>
        </a-menu>
      </yc-layout-header>
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
const menus = Array(5)
  .fill(undefined)
  .map((_, i) => {
    return {
      title: `菜单${i + 1}`,
      path: `菜单 ${i + 1}`,
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
      height: 200px;
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
