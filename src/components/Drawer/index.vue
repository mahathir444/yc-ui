<template>
  <teleport :to="popupContainer" :disabled="!renderToBody">
    <div
      v-if="!unmountOnClose || outerVisible"
      v-show="outerVisible"
      class="yc-drawer-wrapper"
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
          class="yc-drawer-container"
          :style="drawerCss"
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
                name="close"
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
import { toRefs, computed, CSSProperties } from 'vue';
import { DRAWER_POSTION_STYLE } from './constants';
import { DrawerProps } from './type';
import { CloseType } from '@/components/_type';
import useCloseCompt from '@/components/_hooks/useCloseCompt';
import YcButton from '@/components/Button/Button.vue';
import YcIconButton from '@/components/_components/IconButton/index.vue';
defineOptions({
  name: 'Drawer',
});
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
  popupContainer: 'body',
  drawerStyle: () => {
    return {};
  },
  escToClose: true,
  renderToBody: true,
  header: true,
  footer: true,
  hideCancel: false,
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
const {
  visible,
  defaultVisible,
  width,
  height,
  placement,
  maskClosable,
  escToClose,
  drawerStyle,
} = toRefs(props);
// drawer绝对定位的left,top
const drawerCss = computed(() => {
  return {
    ...DRAWER_POSTION_STYLE[placement.value],
    height:
      placement.value == 'left' || placement.value == 'right'
        ? '100%'
        : `${height.value}px`,
    width:
      placement.value == 'left' || placement.value == 'right'
        ? `${width.value}px`
        : `100%`,
    // 传入样式
    ...drawerStyle.value,
  } as CSSProperties;
});
// 处理组件关闭开启
const { outerVisible, innerVisible, closeType, handleClose, handleAfterLeave } =
  useCloseCompt(emits, {
    visible,
    defaultVisible,
    escToClose,
    maskClosable,
  });
</script>

<style lang="less" scoped>
@import './index.less';
</style>
