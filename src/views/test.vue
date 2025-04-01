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
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import CxInput from '@/teaching/Input/index.vue';

const value = ref('dsadsa');
const options = ['Bytedance', 'Bytedesign', 'Bytenumner'].map((item) => {
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

.popover-content {
  width: 200px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
}
</style>
