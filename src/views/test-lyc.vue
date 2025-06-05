<template>
  <div class="test">
    <a-progress :steps="3" size="small" :percent="0.3" />
    <yc-progress :steps="3" size="small" :percent="0.3" />
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
const percent = ref(0.2);
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
