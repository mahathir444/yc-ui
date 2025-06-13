<template>
  <div class="test">
    <yc-select allow-search :options="[1, 2, 3, 4, 5]" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const options = Array(1000)
  .fill(null)
  .map((_, index) => `Option ${index}`);
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
</style>
