<template>
  <div class="test">
    <a-tabs
      type="line"
      direction="vertical"
      :header-padding="false"
      style="width: 100%"
    >
      <a-tab-pane key="1" title="Tab 1"> Content of Tab Panel 1 </a-tab-pane>
      <a-tab-pane key="2" title="Tab 2"> Content of Tab Panel 2 </a-tab-pane>
      <a-tab-pane key="3">
        <template #title>
          <span class="test">Tab 33333333</span>
        </template>
        Content of Tab Panel 3
      </a-tab-pane>
    </a-tabs>
    <yc-tabs default-active-key="2" type="card">
      <yc-tab-pane path="1" title="Tab 1"> Content of Tab Panel 1 </yc-tab-pane>
      <yc-tab-pane path="2" title="Tab 2"> Content of Tab Panel 2 </yc-tab-pane>
      <yc-tab-pane path="3" title="Tab 3">
        <template #title>Tab 33333333</template>
        Content of Tab Panel 3
      </yc-tab-pane>
    </yc-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
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
