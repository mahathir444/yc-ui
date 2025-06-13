<template>
  <div class="test">
    <yc-input v-model="value" />
    <a-popover>
      <a-button>测试</a-button>
      <template #content>
        <span>测试</span>
      </template>
    </a-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
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
