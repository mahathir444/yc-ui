<template>
  <div class="test">
    <a-time-picker type="time-range">
      <template #prefix> dsads </template>
      <template #suffix-icon>
        <IconApps />
      </template>
      <template #extra> sdasdsa </template>
    </a-time-picker>
    <yc-time-picker default-value="18:50:22">
      <template #prefix> dsads </template>
      <template #suffix-icon>
        <IconApps />
      </template>
    </yc-time-picker>
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
