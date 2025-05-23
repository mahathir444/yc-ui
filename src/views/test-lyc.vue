<template>
  <div class="test">
    <yc-tabs
      default-active-key="2"
      type="line"
      editable
      show-add-button
      destory-on-hide
    >
      <yc-tab-pane v-for="i in 10" :path="`${i}`" :title="`tab ${i}`">
        <div style="padding: 16px">Content of Tab Panel {{ i }}</div>
      </yc-tab-pane>
    </yc-tabs>
    <div style="width: 800px">
      <a-tabs default-active-key="15" type="line" animation destroy-on-hide>
        <a-tab-pane v-for="i in 15" :key="`${i}`" :title="`tab ${i}`">
          <div style="padding: 16px">Content of Tab Panel {{ i }}</div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref('1202s');
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
