<template>
  <div class="test">
    <yc-countdown title="Countdown" format="HH:mm:ss.SSS" :start="start" />
    <a-button @click="start = !start">开启动画</a-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const start = ref<boolean>(false);
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
