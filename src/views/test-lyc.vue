<template>
  <div class="test">
    <div style="width: 100%">
      <yc-tabs position="left" type="card">
        <yc-tab-pane
          v-for="item of data"
          :key="item.key"
          :title="item.title"
          :path="item.key"
        >
          {{ item?.content }}
        </yc-tab-pane>
      </yc-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const data = ref(
  new Array(25).fill(0).map((_, i) => {
    return {
      key: `key ${i}`,
      title: `tab ${i + 1}`,
      content: `Content of Tab Panel ${i + 1}`,
    };
  })
);
</script>

<style lang="less" scoped>
.test {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  gap: 10px;
}
</style>
