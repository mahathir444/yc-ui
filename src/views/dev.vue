<template>
  <div class="test"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const handleSelect = (v) => {
  console.log(v);
};
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
