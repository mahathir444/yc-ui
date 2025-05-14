<template>
  <div class="container">
    <yc-menu v-model:selected-keys="keys" show-collapse-button class="sider">
      <yc-menu-item v-for="item in menus" :key="item.path" :path="item.path">
        {{ item.title }}
      </yc-menu-item>
    </yc-menu>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const keys = ref('lyc');
const menus = [
  {
    title: '开发-lyc',
    path: 'lyc',
  },
  {
    title: '开发-lsh',
    path: 'lsh',
  },
  {
    title: '通用(3/4)',
    path: 'common',
  },
  {
    title: '布局(4/4)',
    path: 'layout',
  },
  {
    title: '数据展示(12/19)',
    path: 'dataShow',
  },
  {
    title: '数据输入(16/21)',
    path: 'form',
  },
  {
    title: '反馈(10/10)',
    path: 'feedback',
  },
  {
    title: '导航(6/6)',
    path: 'navigation',
  },
  {
    title: '其它(10/10)',
    path: 'other',
  },
];

watch(
  () => keys.value,
  () => {
    router.push({
      name: keys.value,
    });
  }
);
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  .sider,
  .main {
    flex-shrink: 0;
  }
  .sider {
    width: 260px;
    border-right: 1px solid rgb(229, 230, 235);
  }
  .main {
    padding: 20px;
    flex: 1;
    overflow: auto;
  }
}
</style>
