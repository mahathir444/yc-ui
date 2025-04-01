<template>
  <a-drawer
    v-bind="props"
    v-model:visible="computedVisible"
    class="cx-drawer"
    @cancel="(ev) => $emit('cancel', ev)"
    @ok="(ev) => $emit('ok', ev)"
    @open="$emit('open')"
    @close="$emit('close')"
    @before-open="$emit('beforeOpen')"
    @before-close="$emit('beforeClose')"
  >
    <template #footer>
      <slot name="footer">
        <cx-button type="outline" v-bind="cancelButtonProps"> 取消 </cx-button>
        <cx-button type="primary" :loading="okLoading" v-bind="okButtonProps">
          确认
        </cx-button>
      </slot>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { DrawerProps } from './type';
import useControlValue from '../_shared/hooks/useControlValue';
import CxButton from '../Button';
const props = withDefaults(defineProps<DrawerProps>(), {
  visible: undefined,
  defaultVisible: false,
  placement: 'right',
  title: '',
  mask: true,
  maskClosable: true,
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
  unmountOnClose: false,
  width: 250,
  height: 250,
  popupContainer: undefined,
  drawerStyle: () => {
    return {};
  },
  escToClose: true,
  renderToBody: true,
  header: true,
  footer: true,
  hideCancel: false,
  onBeforeCancel: () => {
    return true;
  },
  onBeforeOk: () => {
    return true;
  },
});
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'ok', ev: Event): void;
  (e: 'cancel', ev: Event): void;
  (e: 'open'): void;
  (e: 'beforeOpen'): void;
  (e: 'close'): void;
  (e: 'beforeClose'): void;
}>();
const { visible, defaultVisible } = toRefs(props);
// 受控的visible
const computedVisible = useControlValue<boolean>(
  visible,
  defaultVisible.value,
  (val) => {
    emits('update:visible', val);
  }
);
</script>

<style lang="less">
.cx-drawer {
  .arco-drawer-mask {
    background: rgba(0, 0, 0, 0.6);
  }
  .arco-drawer {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    background: #fff;

    .arco-drawer-header {
      padding: 16px 24px;
      border-bottom: 1px solid #f2f5fa;
      .arco-drawer-title {
        color: #0d1014;
        font-family: 'PingFang SC';
        font-size: 15px;
        font-weight: 500;
      }
      .arco-drawer-close-btn {
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
    .arco-drawer-body {
      padding: 24px 24px 0 17px;
      min-height: 268px;
    }
    .arco-drawer-footer {
      height: 64px;
      width: 100%;
      padding: 16px 24px;
      border-bottom: 1px solid #f2f5fa;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
