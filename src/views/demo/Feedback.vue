<template>
  <div class="feedback">
    <yc-alert closable>
      This is an info alert.
      <template #action>
        <yc-button size="small" type="primary">Detail</yc-button>
      </template>
    </yc-alert>
    <yc-button type="primary" @click="visible = true">Open Drawer</yc-button>
    <yc-drawer :width="340" v-model:visible="visible" unmountOnClose>
      <template #title> Title </template>
      <div>
        You can customize modal body text by the current situation. This modal
        will be closed immediately once you press the OK button.
      </div>
    </yc-drawer>
    <yc-space>
      <yc-button @click="Message.info('This is an info message!')"
        >Info Message</yc-button
      >
      <yc-button
        @click="Message.success('This is a success message!')"
        status="success"
        >Success Message
      </yc-button>
      <yc-button
        @click="Message.warning('This is a warning message!')"
        status="warning"
        >Warning Message
      </yc-button>
      <yc-button
        @click="Message.error('This is an error message!')"
        status="danger"
        >Error Message</yc-button
      >
    </yc-space>
    <yc-button @click="visible = true">Open Modal</yc-button>
    <yc-modal>
      <template #title> Title </template>
      <div>
        You can customize modal body text by the current situation. This modal
        will be closed immediately once you press the OK button.
      </div>
    </yc-modal>
    <yc-space>
      <yc-button
        type="primary"
        @click="Notification.info('This is an info message!')"
      >
        Info
      </yc-button>
      <yc-button
        type="primary"
        status="success"
        @click="Notification.success('This is a success message!')"
      >
        Success
      </yc-button>
      <yc-button
        type="primary"
        status="warning"
        @click="Notification.warning('This is a warning message!')"
      >
        Warning
      </yc-button>
      <yc-button
        type="primary"
        status="danger"
        @click="Notification.error('This is an error message!')"
      >
        Error
      </yc-button>
      <yc-button
        type="secondary"
        @click="
          Notification.info({
            content: 'This is an error message!',
            showIcon: false,
          })
        "
      >
        Normal
      </yc-button>
    </yc-space>
    <yc-popconfirm content="Are you sure you want to delete?">
      <yc-button>Click To Delete</yc-button>
    </yc-popconfirm>
    <yc-result
      title="This is title content"
      subtitle="This is subtitle content"
    >
      <template #extra>
        <yc-space>
          <yc-button type="secondary">Again</yc-button>
          <yc-button type="primary">Back</yc-button>
        </yc-space>
      </template>
    </yc-result>
    <yc-space size="large">
      <yc-spin :size="20" />
      <yc-spin :size="28" />
      <yc-spin :size="32" />
    </yc-space>
    <yc-space direction="vertical" size="large" :style="{ width: '100%' }">
      <yc-space>
        <span>Animation</span>
        <yc-switch v-model="animation" />
      </yc-space>
      <yc-skeleton :animation="animation" loading style="width: 30%">
        <yc-space direction="vertical" :style="{ width: '100%' }" size="large">
          <yc-skeleton-line :rows="3" />
          <yc-skeleton-shape />
        </yc-space>
      </yc-skeleton>
    </yc-space>
    <yc-progress
      type="circle"
      :percent="1"
      :width="100"
      :color="{
        '0%': 'rgb(22, 93, 255)',
        '100%': 'rgb(0, 180, 42)',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import Message from '@/components/Message';
import Notification from '@/components/Notification';
const visible = ref(false);
const animation = ref(false);
</script>

<style lang="less" scoped>
.feedback {
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
