<template>
  <div class="test"></div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
</script>

<style lang="less" scoped>
.test {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  gap: 10px;
}
</style>
