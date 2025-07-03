<template>
  <div class="test">
    <a-time-picker type="time-range" disable-confirm> </a-time-picker>
    <yc-time-picker type="time-range" disable-confirm> </yc-time-picker>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  gap: 10px;
  .resize-left {
    flex: 1;
    height: 500px;
    background-color: blueviolet;
  }
}
</style>
