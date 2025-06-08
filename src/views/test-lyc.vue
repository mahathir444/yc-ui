<template>
  <div class="test" id="test">
    <!-- <yc-popover
      :contentStyle="{
        width: '200px',
      }"
    >
      <yc-button style="width: 100px">点击测试</yc-button>
      <template #content>
        <yc-empty />
      </template>
    </yc-popover> -->
    <div>
      <yc-scrollbar style="height: 200px; width: 200px; overflow: auto">
        <div
          style="
            height: 2000px;
            width: 2000px;
            background-color: var(--color-primary-light-4);
          "
        >
          Content
        </div>
      </yc-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { AffixInstance } from '@arco-design/web-vue';
const size = ref(0.5);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 10px;
  overflow: auto;
}

.trigger-demo-nest {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.trigger-demo-nest-popup-content {
  text-align: right;
}
</style>
