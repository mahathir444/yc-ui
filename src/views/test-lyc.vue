<template>
  <div class="test">
    <a-verification-code
      defaultValue="1x3456"
      style="width: 300px"
      :formatter="
        (inputValue) => (/^\d*$/.test(inputValue) ? inputValue : false)
      "
    />
    <yc-verification-code
      defaultValue="123456"
      style="width: 300px"
      :formatter="
        (inputValue) => (/^\d*$/.test(inputValue) ? inputValue : false)
      "
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
