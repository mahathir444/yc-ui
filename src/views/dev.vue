<template>
  <div class="test" id="test">
    <yc-list :max-height="240" @reach-bottom="fetchData" :scrollbar="scrollbar">
      <template #header> List title </template>
      <template #scroll-loading>
        <div v-if="bottom">No more data</div>
        <yc-spin v-else />
      </template>
      <yc-list-item v-for="item of data">{{ item }}</yc-list-item>
    </yc-list>
    <a-list :max-height="240" @reach-bottom="fetchData" :scrollbar="scrollbar">
      <template #header> List title </template>
      <template #scroll-loading>
        <div v-if="bottom">No more data</div>
        <yc-spin v-else />
      </template>
      <a-list-item v-for="item of data">{{ item }}</a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const current = ref(1);
const bottom = ref(false);
const data = reactive([
  `Beijing Bytedance Technology Co., Ltd. ${1}`,
  `Bytedance Technology Co., Ltd. ${2}`,
  `Beijing Toutiao Technology Co., Ltd. ${3}`,
  `Beijing Volcengine Technology Co., Ltd. ${4}`,
  `China Beijing Bytedance Technology Co., Ltd. ${5}`,
]);
const scrollbar = ref(true);
const fetchData = () => {
  if (current.value <= 5) {
    window.setTimeout(() => {
      const index = data.length;
      data.push(
        `Beijing Bytedance Technology Co., Ltd. ${index + 1}`,
        `Bytedance Technology Co., Ltd. ${index + 2}`,
        `Beijing Toutiao Technology Co., Ltd. ${index + 3}`,
        `Beijing Volcengine Technology Co., Ltd. ${index + 4}`,
        `China Beijing Bytedance Technology Co., Ltd. ${index + 5}`
      );
      current.value += 1;
    }, 2000);
  } else {
    bottom.value = true;
  }
};
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
