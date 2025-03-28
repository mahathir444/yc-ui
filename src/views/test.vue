<template>
  <div class="test">
    <div style="width: 300px; height: 300px">
      <yc-slider
        v-model="value"
        show-input
        :marks="{
          10: '10km',
          30: '30km',
          60: '60km',
          90: '90km',
        }"
      />
    </div>
    <div style="width: 300px">
      mention
      <yc-mention :data="options" placeholder="mention" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const value = ref(0);
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
