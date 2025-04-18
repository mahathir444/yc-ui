<template>
  <div class="test">
    <div>
      <yc-spin tip="Spin" :size="50" />
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
      <yc-overflow-list
        :min="2"
        :style="{
          width: width + 'px',
        }"
      >
        <yc-tag v-for="i in options" :key="i.value">{{ i.label }}</yc-tag>
      </yc-overflow-list>
    </div>
    <div>
      <a-slider
        v-model="width"
        :min="300"
        :max="1200"
        style="width: 500px"
      ></a-slider>
    </div>
    <div>
      <yc-button
        type="primary"
        @click="
          Message.success({
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
import { ref } from 'vue';
import Message from '@/components/Message';
import Notification from '@/components/Notification';
const visible = ref(false);
const width = ref(300);
const options = ref<any[]>([]);
for (let i = 0; i < 100; i++) {
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
