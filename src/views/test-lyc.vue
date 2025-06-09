<template>
  <div class="test" id="test">
    <div class="menu-demo">
      <yc-menu mode="horizontal" theme="dark" default-selected-keys="1">
        <yc-menu-item
          path="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div
            :style="{
              width: '80px',
              height: '30px',
              background: 'var(--color-fill-3)',
              cursor: 'text',
            }"
          />
        </yc-menu-item>
        <yc-sub-menu title="测试" path="1">
          <yc-menu-item key="1-1">Home</yc-menu-item>
        </yc-sub-menu>
        <yc-menu-item path="2">Solution</yc-menu-item>
        <yc-menu-item path="3">Cloud Service</yc-menu-item>
        <yc-menu-item path="4">Cooperation</yc-menu-item>
      </yc-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';
const width = ref(240);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}
.menu-demo {
  box-sizing: border-box;
  height: 800px;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>
