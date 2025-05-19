<template>
  <div class="test">
    <a-list
      :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
      :data="dataSource"
      :bordered="false"
      style="width: 100%"
    >
      <template #item="{ item }">
        <a-list :data="item.data">
          <template #header>{{ item.title }}</template>
          <template #item="{ item: subItem }">
            <a-list-item>{{ subItem }}</a-list-item>
          </template>
        </a-list>
      </template>
    </a-list>
    <yc-list
      :grid-props="{
        cols: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6,
        },
        colGap: 20,
        rowGap: 20,
      }"
      :data="dataSource"
      :bordered="false"
    >
      <template #item="{ item }">
        <yc-list :data="item.data">
          <template #header>{{ item.title }}</template>
          <template #item="{ item: subItem }">
            <yc-list-item>{{ subItem }}</yc-list-item>
          </template>
        </yc-list>
      </template>
    </yc-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const dataSource = [
  {
    title: 'Platform',
    data: ['iOS', 'Android', 'Web'],
  },
  {
    title: 'Framework',
    data: ['Angular', 'Vue', 'React'],
  },
  {
    title: 'Language',
    data: ['C++', 'JavaScript', 'Python'],
  },
  {
    title: 'Component',
    data: ['Button', 'Breadcrumb', 'Transfer'],
  },
  {
    title: 'Design',
    data: ['Figma', 'Sketch', 'Adobe XD'],
  },
  {
    title: 'Plugin',
    data: ['Edu Tools', 'BashSupport', 'GitToolBox'],
  },
  {
    title: 'Platform',
    data: ['iOS', 'Android', 'Web'],
  },
  {
    title: 'Framework',
    data: ['Angular', 'Vue', 'React'],
  },
  {
    title: 'Language',
    data: ['C++', 'JavaScript', 'Python'],
  },
];
</script>

<style lang="less" scoped>
.test {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
