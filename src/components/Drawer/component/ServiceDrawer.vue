<template>
  <yc-drawer
    v-model:visible="visible"
    :placement="placement"
    :title="title"
    :mask="mask"
    :mask-closable="maskClosable"
    :closable="closable"
    :ok-text="okText"
    :cancel-text="cancelText"
    :ok-loading="okLoading"
    :ok-button-props="okButtonProps"
    :cancel-button-props="cancelButtonProps"
    :unmount-on-close="unmountOnClose"
    :width="width"
    :height="height"
    :popup-container="popupContainer"
    :drawer-style="drawerStyle"
    :esc-to-close="escToClose"
    :render-to-body="renderToBody"
    :header="header"
    :footer="footer"
    :hide-cancel="hideCancel"
    :on-before-cancel="onBeforeCancel"
    :on-before-ok="onBeforeOk"
    @close="onClose?.()"
    @open="onOpen?.()"
    @before-close="onBeforeClose?.()"
    @before-open="onBeforeOpen?.()"
    @ok="onOk?.()"
    @cancel="onCancel?.()"
  >
    <template #title>
      <component :is="getSlotFunction(title)" />
    </template>
    <div class="yc-drawer-body-content">
      <component :is="getSlotFunction(content)" />
    </div>
  </yc-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DrawerConfig } from '../type';
import { getSlotFunction } from '@shared/utils';
import YcDrawer from '../index.vue';
withDefaults(defineProps<DrawerConfig>(), {
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
  renderToBody: false,
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
// visible
const visible = ref<boolean>(true);
</script>
