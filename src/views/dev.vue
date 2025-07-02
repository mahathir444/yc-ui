<template>
  <div class="test">
    <a-resize-box
      :directions="['right', 'bottom']"
      style="min-width: 100px; height: fit-content"
    >
      <div style="width: 500px; height: 500px; background-color: skyblue"></div>
    </a-resize-box>
    <yc-resize-box
      :directions="['right', 'bottom']"
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
  flex-direction: column;
  gap: 10px;
}
</style>
