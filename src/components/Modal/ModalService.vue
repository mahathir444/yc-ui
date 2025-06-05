<template>
  <yc-modal
    v-model:visible="visible"
    :width="width"
    :top="top"
    :mask="mask"
    :title="title"
    :title-align="titleAlign"
    :align-center="alignCenter"
    :unmount-on-close="unmountOnClose"
    :mask-closable="maskClosable"
    :hide-cancel="hideCancel"
    :closable="closable"
    :ok-text="okText"
    :cancel-text="cancelText"
    :ok-loading="okLoading"
    :ok-button-props="okButtonProps"
    :cancel-button-props="cancelButtonProps"
    :footer="footer"
    :popup-container="popupContainer"
    :mask-style="maskStyle"
    :modal-style="modalStyle"
    :esc-to-close="escToClose"
    :draggable="draggable"
    :fullscreen="fullscreen"
    :body-style="bodyStyle"
    :hide-title="hideTitle"
    :render-to-body="renderToBody"
    :simple="simple"
    :modal-class="'yc-service-modal'"
    :on-before-ok="(done) => onBeforeOk?.(done)"
    :on-before-cancel="onBeforeCancel"
    @ok="onOk?.()"
    @cancel="onCancel?.()"
    @before-open="onBeforeOpen?.()"
    @before-close="onBeforeClose?.()"
    @open="onOpen?.()"
    @close="handleClose"
  >
    <template #title>
      <span v-if="type" class="yc-modal-title-icon">
        <component
          :is="TYPE_ICON_MAP[type]"
          :color="TYPE_ICON_COLOR_MAP[type]"
        />
      </span>
      <span class="yc-modal-title-content text-ellipsis">
        <component :is="getSlotFunction(title)" />
      </span>
    </template>
    <div class="yc-modal-body-content text-ellipsis">
      <component :is="getSlotFunction(content)" />
    </div>
  </yc-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ModalConfig } from './type';
import { getSlotFunction } from '@shared/utils';
import { TYPE_ICON_MAP, TYPE_ICON_COLOR_MAP } from '@shared/constants';
import YcModal from './Modal.vue';
const props = withDefaults(defineProps<ModalConfig>(), {
  width: 400,
  top: 100,
  mask: true,
  title: '',
  titleAlign: 'center',
  alignCenter: true,
  unmountOnClose: false,
  maskClosable: true,
  hideCancel: true,
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
  renderToBody: false,
  popupContainer: undefined,
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
  simple: true,
  onBeforeCancel: () => {
    return true;
  },
  onBeforeOk: () => {
    return true;
  },
  serviceCloseFn: () => {},
  content: '',
});
const { onClose, serviceCloseFn } = props;
// visible
const visible = ref<boolean>(true);
// 处理close
const handleClose = () => {
  serviceCloseFn?.();
  onClose?.();
};
</script>

<style lang="less">
.yc-service-modal {
  .yc-modal-header {
    .yc-modal-title {
      display: flex;
      justify-content: center;
      gap: 6px;
      .yc-modal-title-icon {
        display: flex;
        align-items: center;
        font-size: 18px;
      }
      .yc-modal-title-content {
        flex-shrink: 0;
        overflow: hidden;
      }
    }
  }
  .yc-modal-body {
    .yc-modal-body-content {
      width: 100%;
      line-height: 26px;
      color: #474c59;
      font-family: 'PingFang SC';
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
