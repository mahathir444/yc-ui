<template>
  <div class="test">
    <div style="margin-bottom: 20px">
      <yc-typography-text>折叠：</yc-typography-text>
      <yc-switch :checked="collapsed" @click="collapsed = !collapsed" />
    </div>
    <a-grid
      :cols="3"
      :colGap="12"
      :rowGap="16"
      :collapsed="collapsed"
      class="grid-demo-grid"
    >
      <a-grid-item class="demo-item">item</a-grid-item>
      <a-grid-item class="demo-item">item</a-grid-item>
      <a-grid-item class="demo-item">item</a-grid-item>
      <a-grid-item class="demo-item">item </a-grid-item>
      <a-grid-item class="demo-item">item</a-grid-item>
      <a-grid-item class="demo-item" :span="3">item | span - 3</a-grid-item>
      <a-grid-item class="demo-item">item</a-grid-item>
      <a-grid-item class="demo-item" suffix>suffix</a-grid-item>
      <a-grid-item class="demo-item" :span="3" suffix #default="{ overflow }">
        suffix | overflow: {{ overflow }}
      </a-grid-item>
    </a-grid>
    <yc-grid
      :cols="3"
      :colGap="12"
      :rowGap="16"
      class="grid-demo-grid"
      :collapsed="collapsed"
    >
      <yc-grid-item class="demo-item">item</yc-grid-item>
      <yc-grid-item class="demo-item">item</yc-grid-item>
      <yc-grid-item class="demo-item">item</yc-grid-item>
      <yc-grid-item class="demo-item">item</yc-grid-item>
      <yc-grid-item class="demo-item">item</yc-grid-item>
      <yc-grid-item class="demo-item" :span="3">item | span - 3</yc-grid-item>
      <yc-grid-item class="demo-item">item</yc-grid-item>
      <yc-grid-item class="demo-item">item</yc-grid-item>
      <yc-grid-item class="demo-item" :span="1" suffix #default="{ overflow }">
        suffix | overflow: {{ overflow }}
      </yc-grid-item>
    </yc-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
const collapsed = ref(false);
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
  .grid-demo-grid .demo-item,
  .grid-demo-grid .demo-suffix {
    height: 48px;
    line-height: 48px;
    color: var(--color-white);
    text-align: center;
  }

  .grid-demo-grid .demo-item:nth-child(2n) {
    background-color: rgba(var(--arcoblue-6), 0.9);
  }

  .grid-demo-grid .demo-item:nth-child(2n + 1) {
    background-color: var(--color-primary-light-4);
  }
}
</style>
