<template>
  <div class="test">
    <div style="width: 500px; height: 300px">
      <yc-slider show-input />
    </div>
    <div style="width: 300px; font-size: 20px">
      <cx-input
        v-model="value"
        allow-clear
        show-word-limit
        :max-length="1000"
        placeholder="请输入"
      />
    </div>
    <div style="width: 300px; font-size: 20px">
      <cx-select
        :options="options"
        :max-tag-count="2"
        prefix-text="测试"
        multiple
        placeholder="请选择"
        allow-clear
      ></cx-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import CxInput from '@/teaching/Input';
import CxSelect from '@/teaching/Select';
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
