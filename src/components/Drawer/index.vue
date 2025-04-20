<template>
  <teleport :to="popupContainer" :disabled="!renderToBody">
    <div
      v-if="!unmountOnClose || outerVisible"
      v-show="outerVisible"
      :class="[
        'yc-drawer-wrapper',
        popupContainer || !renderToBody
          ? 'yc-drawer-wrapper-position-absolute'
          : '',
        DRAWER_PLACEMENT_MAP[placement],
      ]"
    >
      <!-- mask -->
      <transition name="fade" appear>
        <div
          v-if="mask"
          v-show="innerVisible"
          class="yc-drawer-mask"
          @click="handleClose('mask')"
        ></div>
      </transition>
      <!-- drawer -->
      <transition
        :name="`slide-drawer-${placement}`"
        appear
        @before-enter="$emit('beforeOpen')"
        @before-leave="$emit('beforeClose', closeType)"
        @after-enter="$emit('open')"
        @after-leave="handleAfterLeave"
      >
        <div
          v-show="innerVisible"
          :class="['yc-drawer-container', $attrs.class]"
          :style="drawerStyle"
        >
          <!-- header -->
          <slot name="header">
            <div v-if="header" class="yc-drawer-header">
              <!-- title -->
              <div class="yc-drawer-title text-ellipsis">
                <slot name="title">
                  <span>{{ title }}</span>
                </slot>
              </div>
              <!-- close-btn -->
              <yc-icon-button
                v-if="closable"
                class="yc-modal-close-button"
                @click="handleClose('closeBtn')"
              />
            </div>
          </slot>
          <!-- body -->
          <div class="yc-drawer-body">
            <slot />
          </div>
          <!-- footer -->
          <slot name="footer">
            <div v-if="footer" class="yc-drawer-footer">
              <yc-button
                v-if="!hideCancel"
                v-bind="cancelButtonProps"
                @click="handleClose('cancelBtn')"
              >
                {{ cancelText }}
              </yc-button>
              <yc-button
                type="primary"
                :loading="okLoading"
                v-bind="okButtonProps"
                @click="handleClose('confirmBtn')"
              >
                {{ okText }}
              </yc-button>
            </div>
          </slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties, useAttrs, ref } from 'vue';
import { DRAWER_PLACEMENT_MAP } from '@shared/constants';
import { DrawerProps } from './type';
import { CloseType } from '@shared/type';
import {
  useModalClose as useDrawerClose,
  useConfigProvder,
} from '@shared/hooks';
import YcButton from '@/components/Button';
import { YcIconButton } from '@shared/components';
defineOptions({
  name: 'Drawer',
  inheritAttrs: false,
});
const props = withDefaults(defineProps<DrawerProps>(), {
  visible: void 0,
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
  popupContainer: void 0,
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
  (e: 'ok'): void;
  (e: 'cancel', type: CloseType): void;
  (e: 'beforeOpen'): void;
  (e: 'open'): void;
  (e: 'beforeClose', type: CloseType): void;
  (e: 'close', type: CloseType): void;
}>();
// 结构属性
const {
  visible,
  defaultVisible,
  width,
  height,
  placement,
  maskClosable,
  escToClose,
  drawerStyle: _drawerStyle,
  renderToBody,
} = toRefs(props);
const { onBeforeOk, onBeforeCancel } = props;
// attrs
const attrs = useAttrs();
// 接收configProvider
const { popupContainer, zIndex } = useConfigProvder(props);
// drawer绝对定位的left,top
const drawerStyle = computed(() => {
  return {
    height:
      placement.value == 'left' || placement.value == 'right'
        ? '100%'
        : `${height.value}px`,
    width:
      placement.value == 'left' || placement.value == 'right'
        ? `${width.value}px`
        : `100%`,
    // 传入样式
    ..._drawerStyle.value,
    ...(attrs.style || {}),
  } as CSSProperties;
});
// 处理组件关闭开启
const { outerVisible, innerVisible, closeType, handleClose, handleAfterLeave } =
  useDrawerClose({
    visible,
    defaultVisible,
    escToClose,
    maskClosable,
    onBeforeCancel,
    onBeforeOk,
    emits,
  });
</script>

<style lang="less" scoped>
@import './style/drawer.less';
.yc-drawer-wrapper {
  z-index: v-bind(zIndex);
}
</style>
