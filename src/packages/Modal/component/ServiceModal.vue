<template>
  <yc-modal
    v-model:visible="visible"
    :title="title"
    :width="width"
    :render-to-body="false"
    title-align="start"
    class="yc-service-modal"
    @close="onClose && onClose()"
    @open="onOpen && onOpen()"
    @before-close="onBeforeClose && onBeforeClose()"
    @before-open="onBeforeOpen && onBeforeOpen()"
    @ok="onOk && onOk()"
    @cancel="onCancel && onCancel()"
  >
    <div class="yc-modal-body-content">
      <span>{{ content }}</span>
    </div>
  </yc-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ModalConfig } from '../type';
import YcModal from '../index.vue';
withDefaults(defineProps<ModalConfig>(), {
  width: 520,
  top: 100,
  mask: true,
  title: '',
  titleAlign: 'center',
  alignCenter: true,
  unmountOnClose: false,
  maskClosable: true,
  hideCancel: false,
  closable: true,
  okText: '确认',
  cancelText: '取消',
  okLoading: false,
  okButtonProps: () => {
    return {};
  },
  cancelButtonProps: () => {
    return {};
  },
  footer: true,
  renderToBody: true,
  popupContainer: 'body',
  maskStyle: () => {
    return {};
  },
  modalStyle: () => {
    return {};
  },
  escToClose: true,
  draggable: false,
  fullscreen: false,
  bodyStyle: () => {
    return {};
  },
  hideTitle: false,
  content: '',
});
// visible
const visible = ref<boolean>(true);
</script>

<style lang="less">
.yc-service-modal {
  .yc-modal-body-content {
    width: 100%;
    padding: 31.5px 30px 35.5px 30px;
    display: flex;
    span {
      width: 100%;
      height: 26px;
      line-height: 26px;
      color: #474c59;
      font-family: 'PingFang SC';
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
