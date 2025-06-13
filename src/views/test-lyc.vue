<template>
  <div class="test">
    <a-slider
      :default-value="5"
      :style="{ width: '300px' }"
      :max="15"
      :marks="marks"
    />
    <yc-slider :style="{ width: '300px' }" :max="1000" show-ticks :step="50" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const marks = {
  0: '0km',
  5: '5km',
  10: '10km',
  15: '15km',
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
