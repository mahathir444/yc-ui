<template>
  <div class="test">
    <yc-auto-complete v-model="value" :data="['1', '2', '3']" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const text = ref('');
const value = ref('');
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
