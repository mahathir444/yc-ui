<template>
  <div class="test">
    <a-button type="primary" @click="handleNotification">
      Open Notification
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { Notification } from '@arco-design/web-vue';
import Notification1 from '@/components/Notification';
import { Button } from '@arco-design/web-vue';
import { IconCloseCircle } from '@arco-design/web-vue/es/icon';

const handleNotification = () => {
  Notification1.info({
    title: 'Notification',
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
