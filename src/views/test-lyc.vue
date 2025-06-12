<template>
  <div class="test">
    <a-color-picker defaultValue="#165DFF" hideTrigger showHistory showPreset />
    <a-color-picker defaultValue="#12D2AC" disabled hideTrigger showPreset />
    <yc-color-picker
      defaultValue="#165DFF"
      hideTrigger
      showHistory
      showPreset
    />
    <yc-color-picker defaultValue="#12D2AC" showPreset />
  </div>
</template>

<script lang="ts" setup>
import { ColorPicker as AColorPicker } from '@arco-design/web-vue';
import { ref } from 'vue';

const value = ref('#165DFF');
</script>

<style lang="less" scoped>
.test {
  height: 150vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}
</style>
