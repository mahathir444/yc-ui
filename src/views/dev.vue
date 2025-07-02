<template>
  <div class="test">
    <div class="resize-left"></div>
    <yc-resize-box
      :directions="['left', 'top', 'right', 'bottom']"
      style="min-width: 100px; height: fit-content"
    >
      <div style="width: 500px; height: 500px; background-color: skyblue"></div>
    </yc-resize-box>
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
