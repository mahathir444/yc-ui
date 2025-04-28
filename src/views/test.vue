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
        <yc-menu-item-group title="测试">
          <template v-for="(item, index) in menus" :key="item.path">
            <yc-menu-item :path="item.path">
              <template #icon>
                <icon-apps />
              </template>
              {{ item.title }}
            </yc-menu-item>
          </template>
        </yc-menu-item-group>
      </yc-menu> -->
    </yc-layout-sider>
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
      <yc-layout-content class="content"> </yc-layout-content>
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
      // height: 200px;
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
