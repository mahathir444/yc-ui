<template>
  <div class="test">
    <a-avatar-group :size="24" :max-count="3">
      <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
      <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
      <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
      <a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
      <a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
    </a-avatar-group>
    <yc-avatar-group :size="24" :max-count="3">
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Message } from '@arco-design/web-vue';
const toast = () => {};
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  gap: 10px;
}
</style>
