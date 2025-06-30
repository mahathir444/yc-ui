<template>
  <div class="test">
    <div style="display: flex; gap: 10px">
      <yc-button
        @click="
          $message.info({
            content: '111',
            duration: 10000000,
            showIcon: true,
            closable: true,
            position: 'top',
          })
        "
      >
        测试Message
      </yc-button>
      <yc-button
        @click="
          Message.open({
            content: '测试',
            resetOnHover: true,
          })
        "
      >
        ces modal
      </yc-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { Modal } from '@/components';
import Message1 from '@/components/Message';
import Message from '@/components/YMessage';
import YcMessage from '@/components/YMessage/Message.vue';
import YcMessageContainer from '@/components/YMessage/MessageList.vue';
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
