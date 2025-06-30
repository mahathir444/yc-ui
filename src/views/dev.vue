<template>
  <div class="test">
    <div style="display: flex; gap: 10px">
      <yc-button
        @click="
          Modal.confirm({
            title: 'ces',
            content: '111',
          })
        "
      >
        测试Modal
      </yc-button>
      <yc-button
        @click="
          $modal.confirm({
            title: 'ces',
            content: '111',
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
import { Modal } from '@arco-design/web-vue';
import { Message } from '@/components';
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
