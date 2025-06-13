<template>
  <div class="test">
    <a-slider
      direction="vertical"
      :default-value="5"
      :style="{ width: '300px' }"
      :max="15"
      :marks="{
        5: '5km',
        10: '10km',
      }"
    />

    <yc-slider
      direction="vertical"
      :default-value="5"
      :style="{ width: '300px', height: '300px' }"
      :max="15"
      :marks="{
        5: '5km',
        10: '10km',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref([5, 10]);
const formatter = (value) => {
  return `${Math.round((value / 50) * 100)}%`;
};
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
  overflow: hidden;
}
</style>
