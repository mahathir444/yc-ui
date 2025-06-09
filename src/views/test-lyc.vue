<template>
  <div class="test">
    <a-auto-complete
      :data="data"
      :style="{ width: '360px' }"
      placeholder="please enter something"
      strict
    />
    <yc-auto-complete
      :data="data"
      :style="{ width: '360px' }"
      placeholder="please enter something"
      strict
    />
    <a-input />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const data = ref(['Beijing', 'Shanghai', 'Chengdu', 'WuHan']);
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
