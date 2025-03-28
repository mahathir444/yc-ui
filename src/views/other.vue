<template>
  <div class="test">
    <div>
      <yc-spin tip="Spin" />
    </div>
    <div>
      <yc-button type="primary">button</yc-button>
    </div>
    <div>
      <yc-empty description="empty" />
    </div>
    <div>
      <yc-link status="danger">Link</yc-link>
    </div>
    <div>
      <yc-button type="primary" @click="visible = true">modal</yc-button>
      <yc-modal v-model:visible="visible"></yc-modal>
    </div>
    <div>
      <yc-button type="primary" @click="visible = true">drawer</yc-button>
      <yc-drawer v-model:visible="visible"></yc-drawer>
    </div>
    <div>
      <yc-tag loading checkable closeable> tag</yc-tag>
    </div>
    <div>
      overflowlist
      <yc-overflow-list :min="6">
        <yc-tag v-for="i in 10" :key="i">测试{{ i }}</yc-tag></yc-overflow-list
      >
    </div>
    <div>
      <yc-button
        type="primary"
        @click="
          Message.loading({
            type: 'success',
            content: '成功了',
            duration: 10000000,
            closable: true,
          })
        "
      >
        Message
      </yc-button>
    </div>
    <div>
      <yc-button
        type="primary"
        @click="
          Notification.error({
            type: 'error',
            content: '成功了',
            closable: true,
            duration: 10000000,
          })
        "
      >
        Notification
      </yc-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import Message from '@/components/Message';
import Notification from '@/components/Notification';
const value = ref([]);
const value1 = ref([]);
const visible = ref(false);
const options = ref<any[]>([]);
for (let i = 0; i < 20; i++) {
  options.value.push({
    label: '选项' + i,
    value: i,
  });
}
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
}

.popover-content {
  width: 200px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
}
</style>
