<template>
  <div class="test">
    <div
      style="width: 400px; display: flex; flex-direction: column; gap: 10px"
    ></div>
    <div
      style="width: 400px; display: flex; flex-direction: column; gap: 10px"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref(5);
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
