<template>
  <div class="test">
    <yc-tabs type="card" :default-active-key="2">
      <yc-tab-pane v-for="i in value" :key="i" :path="i" :title="`tab${i}`">
        <div style="padding: 16px">content of tabPane {{ i }}</div>
      </yc-tab-pane>
    </yc-tabs>

    <yc-button @click="value += 5">点击新增5个tab</yc-button>
    <div style="width: 300px">
      <a-timeline
        mode="alternate"
        direction="horizontal"
        label-position="relative"
        style="margin-bottom: 100px"
      >
        <a-timeline-item label="2017-03-10"
          >The first milestone</a-timeline-item
        >
        <a-timeline-item label="2018-05-12"
          >The second milestone</a-timeline-item
        >
        <a-timeline-item label="2020-09-30"
          >The third milestone</a-timeline-item
        >
      </a-timeline>
      <yc-timeline
        mode="alternate"
        direction="horizontal"
        label-position="relative"
      >
        <yc-timeline-item label="2017-03-10"
          >The first milestone</yc-timeline-item
        >
        <yc-timeline-item label="2018-05-12"
          >The second milestone</yc-timeline-item
        >
        <yc-timeline-item label="2020-09-30"
          >The third milestone</yc-timeline-item
        >
      </yc-timeline>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref(5);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
