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
        :popup-max-height="500"
        :trigger-props="{
          unmountOnClose: false,
        }"
      >
        <template v-for="(item, index) in menus" :key="item.path">
          <yc-sub-menu v-if="item.submenu?.length" :title="item.title">
            <template #icon>
              <icon-apps />
            </template>
            <yc-menu-item v-for="v in item.submenu" :path="v.path">
              {{ v.title }}
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
        <a-card :bordered="false" :style="{ width: '100%' }">
          <a-card-grid
            v-for="(_, index) in new Array(7)"
            :key="index"
            :hoverable="index % 2 === 0"
          >
            <a-card class="card-demo" title="Arco Card" :bordered="false">
              <template #extra>
                <a-link>More</a-link>
              </template>
              <p :style="{ margin: 0 }">
                {{ index % 2 === 0 ? 'Card allow to hover' : 'Card content' }}
              </p>
            </a-card>
          </a-card-grid>
        </a-card>
        <yc-card :bordered="false" :style="{ width: '100%' }">
          <yc-card-grid
            v-for="(_, index) in new Array(7)"
            :key="index"
            :hoverable="index % 2 === 0"
          >
            <yc-card class="card-demo" title="Arco Card" :bordered="false">
              <template #extra>
                <a-link>More</a-link>
              </template>
              <p :style="{ margin: 0 }">
                {{ index % 2 === 0 ? 'Card allow to hover' : 'Card content' }}
              </p>
            </yc-card>
          </yc-card-grid>
        </yc-card>
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
      submenu:
        i == 0 ? [{ title: `子菜单`, path: `菜单${Math.random()}` }] : [],
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
      gap: 4px;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
  }
}
</style>
