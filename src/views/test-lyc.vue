<template>
  <div class="test">
    <yc-button type="primary">测试</yc-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref('312321');
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
