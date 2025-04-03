<template>
  <div class="test">
    <div style="width: 300px">
      <yc-color-picker show-text show-preset size="large" />
      <color-picker show-text size="large" :show-preset="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ColorPicker } from '@arco-design/web-vue';
import YcColorPicker from '@/components/ColorPicker/index.vue';
const value = ref('dsadsa');
const options = [
  'Bytedance',
  'Bytedesign',
  'Bytenumner',
  '1',
  '2',
  '3',
  '4',
].map((item) => {
  return {
    label: item,
    value: item,
  };
});
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
