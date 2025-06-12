<template>
  <div class="test">
    <a-input-tag
      :default-value="['one', 'two', 'three', 'four']"
      :style="{ width: '380px' }"
      placeholder="Please Enter"
      :max-tag-count="3"
      allow-clear
    />
    <yc-input-tag
      :default-value="['one', 'two', 'three', 'four']"
      :style="{ width: '380px' }"
      placeholder="Please Enter"
      :max-tag-count="3"
      allow-clear
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';
const value = ref('654321');
const onFinish = (value) => Message.info(`Verification code: ${value}`);
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
