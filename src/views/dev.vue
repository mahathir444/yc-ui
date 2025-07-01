<template>
  <div class="test">
    <div>
      <a-button type="primary" @click="handleNotification">
        Open Notification
      </a-button>
    </div>
    <div class="">
      <a-button type="primary" @click="$message.info('测的是')">
        Open Message
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import Notification from '@/components/Notification';
let id = 0;
const handleNotification = () => {
  id++;
  Notification.info({
    title: `notification${id}`,
    content: 'This is a notification!',
    closable: true,
    style: { width: '500px' },
  });
};
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
