<template>
  <div class="test">
    <a-calendar v-model="value" />
    <yc-calendar v-model="value" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Message } from '@arco-design/web-vue';
const value = ref(new Date('2023-01-01'));
</script>

<style lang="less" scoped>
.test {
  height: 150vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  gap: 10px;
}
</style>
