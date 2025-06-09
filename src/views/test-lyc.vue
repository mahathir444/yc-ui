<template>
  <div class="test" id="test">
    <!-- <yc-popover
      :contentStyle="{
        width: '200px',
      }"
    >
      <yc-input />
      <template #content>
        <yc-empty />
      </template>
    </yc-popover> -->
    <div>
      <yc-steps :current="2">
        <yc-step>Succeeded</yc-step>
        <yc-step>Processing</yc-step>
        <yc-step>Pending</yc-step>
      </yc-steps>
      <yc-divider />
      <div style="line-height: 140px; text-align: center; color: #c9cdd4">
        Step 2 Content
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
const size = ref(0.5);
const width = ref(500);
const number = ref(10);
const tags = computed(() =>
  Array.from({ length: number.value }, (_, idx) => idx + 1)
);
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
