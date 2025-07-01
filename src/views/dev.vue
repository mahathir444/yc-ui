<template>
  <div class="test">
    <a-button
      @click="
        $message.info({
          content: '测试',
          duration: 100000000,
          position: 'bottom',
        })
      "
    ></a-button>
    <yc-notification title="测试" content="dsa" :footer="() => h(Empty)" />
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { Empty } from '@arco-design/web-vue';
import YcNotification from '@/components/YcNotification/Notification.vue';
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
