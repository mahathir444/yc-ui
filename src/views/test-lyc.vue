<template>
  <div class="test">
    <yc-button type="primary" size="medium" status="danger">测试</yc-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
</script>

<style lang="less" scoped>
@list: {
  a: blue, black, pinl, orange;
};

.test {
  background-color: extract(@list[a], 1);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
