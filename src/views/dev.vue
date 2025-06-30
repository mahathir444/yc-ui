<template>
  <div class="test">
    <div>
      <yc-button
        @click="
          $message.info({
            content: '111',
            duration: 10000000,
            showIcon: true,
            closable: true,
            position: 'bottom',
          })
        "
      >
        测试Message
      </yc-button>
      <yc-button
        @click="
          Modal.success({
            content: '测试',
          })
        "
      >
        ces modal
      </yc-button>
    </div>
    <yc-message-container>
      <yc-message content="测试" :icon="renderIcon" type="error" closable />
      <yc-message content="测试" :icon="renderIcon" type="error" closable />
      <yc-message content="测试" :icon="renderIcon" type="error" closable />
      <yc-message content="测试" :icon="renderIcon" type="error" closable />
    </yc-message-container>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { Modal } from '@/components';
import YcMessage from '@/components/YMessage/Message.vue';
import YcMessageContainer from '@/components/YMessage/MessageContainer.vue';
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';
const renderIcon = () => h(IconExclamationCircleFill);
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
