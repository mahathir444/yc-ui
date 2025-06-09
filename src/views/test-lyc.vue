<template>
  <div class="test" id="test">
    <div class="menu-demo">
      <a-menu
        :style="{ width: '200px', height: '400px' }"
        :default-open-keys="['0']"
        :default-selected-keys="['0_2']"
        :trigger-props="{
          trigger: 'click',
        }"
        show-collapse-button
        breakpoint="xl"
        @collapse="onCollapse"
      >
        <a-sub-menu key="0">
          <template #icon><icon-apps></icon-apps></template>
          <template #title>Navigation 1</template>
          <a-menu-item key="0_0">Menu 1</a-menu-item>
          <a-menu-item key="0_1">Menu 2</a-menu-item>
          <a-menu-item key="0_2">Menu 3</a-menu-item>
          <a-menu-item key="0_3">Menu 4</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="1">
          <template #icon><icon-bug></icon-bug></template>
          <template #title>Navigation 2</template>
          <a-menu-item key="1_0">Menu 1</a-menu-item>
          <a-menu-item key="1_1">Menu 2</a-menu-item>
          <a-menu-item key="1_2">Menu 3</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="2">
          <template #icon><icon-bulb></icon-bulb></template>
          <template #title>Navigation 3</template>
          <a-menu-item key="2_0">Menu 1</a-menu-item>
          <a-menu-item key="2_1">Menu 2</a-menu-item>
          <a-sub-menu key="2_2" title="Navigation 4">
            <a-menu-item key="2_2_0">Menu 1</a-menu-item>
            <a-menu-item key="2_2_1">Menu 2</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="menu-demo">
      <yc-menu
        :style="{ width: '200px', height: '400px' }"
        :default-open-keys="['0']"
        :default-selected-keys="'0_2'"
        show-collapse-button
        breakpoint="xl"
        @collapse="onCollapse"
      >
        <yc-sub-menu path="0">
          <template #icon><icon-apps></icon-apps></template>
          <template #title>Navigation 1</template>
          <yc-menu-item path="0_0">Menu 1</yc-menu-item>
          <yc-menu-item path="0_1">Menu 2</yc-menu-item>
          <yc-menu-item path="0_2">Menu 3</yc-menu-item>
          <yc-menu-item path="0_3">Menu 4</yc-menu-item>
        </yc-sub-menu>
        <yc-sub-menu path="1">
          <template #icon><icon-bug></icon-bug></template>
          <template #title>Navigation 2</template>
          <yc-menu-item path="1_0">Menu 1</yc-menu-item>
          <yc-menu-item path="1_1">Menu 2</yc-menu-item>
          <yc-menu-item path="1_2">Menu 3</yc-menu-item>
        </yc-sub-menu>
        <yc-sub-menu path="2">
          <template #icon><icon-bulb></icon-bulb></template>
          <template #title>Navigation 3</template>
          <yc-menu-item path="2_0">Menu 1</yc-menu-item>
          <yc-menu-item path="2_1">Menu 2</yc-menu-item>
          <yc-sub-menu path="2_2" title="Navigation 4">
            <yc-menu-item path="2_2_0">Menu 1</yc-menu-item>
            <yc-menu-item path="2_2_1">Menu 2</yc-menu-item>
          </yc-sub-menu>
        </yc-sub-menu>
      </yc-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';
const collapsed = ref(false);
function onCollapse(val, type) {
  const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
  Message.info({
    content,
    duration: 2000,
  });
}
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
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>
