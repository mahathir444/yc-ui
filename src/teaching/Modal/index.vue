<template>
  <a-modal v-bind="props" v-model:visible="computedVisible" class="cx-modal">
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue';
import { ModalProps } from './type';
import useControlValue from '../_shared/hooks/useControlValue';
const props = withDefaults(defineProps<ModalProps>(), {
  visible: undefined,
  defaultVisible: false,
  width: 520,
  top: 100,
  mask: true,
  title: '',
  titleAlign: 'start',
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
  popupContainer: undefined,
  maskStyle: () => {
    return {};
  },
  modalClass: '',
  modalStyle: () => {
    return {};
  },
  escToClose: true,
  draggable: false,
  fullscreen: false,
  maskAnimationName: undefined,
  modalAnimationName: undefined,
  bodyClass: '',
  bodyStyle: () => {
    return {};
  },
  hideTitle: false,
  onBeforeCancel: () => {
    return true;
  },
  onBeforeOk: () => {
    return true;
  },
});
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel'): void;
  (e: 'open'): void;
  (e: 'beforeOpen'): void;
  (e: 'close'): void;
  (e: 'beforeClose'): void;
}>();

const { visible, defaultVisible } = toRefs(props);
const computedVisible = useControlValue<boolean>(
  visible,
  defaultVisible.value,
  (val) => {
    emits('update:visible', val);
  }
);
</script>

<style lang="less">
.cx-modal {
  .arco-modal-mask {
    background: rgba(0, 0, 0, 0.6);
  }
  .arco-modal-wrapper {
    .arco-modal {
      border-radius: 16px;
      background: #fff;

      .arco-modal-header {
        padding: 16px 24px 0;
        border-bottom: 0;
        .arco-modal-title {
          color: #0d1014;
          font-family: 'PingFang SC';
          font-size: 15px;
          font-weight: 500;
        }
        .arco-modal-close-btn {
          margin-left: -10px;
          .arco-icon-hover {
            flex-shrink: 0;
            width: 20px;
            height: 20px;
            background: url('../_shared/icons/close-circle.svg') no-repeat;
            svg {
              display: none;
            }
            &::before {
              display: none;
            }
          }
        }
      }
      .arco-modal-body {
        padding: 24px 24px 0 17px;
        min-height: 268px;
      }
      .arco-modal-footer {
        height: 64px;
        width: 100%;
        padding: 16px 24px;
        border-top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
    }
  }
}
</style>
