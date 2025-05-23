<template>
  <div class="test">
    <yc-tabs default-active-key="2" type="card" destory-on-hide>
      <yc-tab-pane v-for="i in value" :path="`${i}`" :title="`tab ${i}`">
        <div style="padding: 16px">Content of Tab Panel {{ i }}</div>
      </yc-tab-pane>
    </yc-tabs>
    <div style="width: 800px">
      <a-tabs :destroy-on-hide="true">
        <a-tab-pane v-for="i in value" :key="`${i}`" :title="`tab ${i}`">
          <div style="padding: 16px">Content of Tab Panel {{ i }}</div>
        </a-tab-pane>
      </a-tabs>
      <a-button @click="value++">点击新增tab</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref(25);
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
