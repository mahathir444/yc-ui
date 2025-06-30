<template>
  <div class="test">
    <div style="display: flex; gap: 10px">
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
import { Modal } from '@/components';
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';
const renderIcon = () => h(IconExclamationCircleFill);
const { close, update } = Modal.open({
  title: '测试update',
  content: '231321321',
});
setTimeout(() => {
  update({
    okLoading: true,
  });
}, 1500);
setTimeout(() => {
  update({
    okLoading: false,
  });
}, 3000);
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
