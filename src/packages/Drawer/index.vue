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
          v-show="innerVisible && controlVisible"
          class="yc-drawer-mask"
          @click="handleClose('mask')"
        ></div>
      </transition>
      <!-- drawer -->
      <transition
        name="slide-drawer"
        appear
        @before-enter="$emit('beforeOpen')"
        @before-leave="$emit('beforeClose', closeType)"
        @after-enter="$emit('open')"
        @after-leave="handleAfterLeave"
      >
        <div
          v-show="innerVisible && controlVisible"
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
              <close-button
                v-if="closable"
                @click="handleClose('closeBtn')"
                class="yc-drawer-close-button"
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
import { ComptCloseType } from '@/type';
import useCloseCompt from '@/hooks/useCloseCompt';
import YcButton from '@/packages/Button/index.vue';
import CloseButton from '@/components/CloseButton/index.vue';
const props = withDefaults(defineProps<DrawerProps>(), {
  visible: undefined,
  defaultVisible: undefined,
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
  (e: 'cancel', type: ComptCloseType): void;
  (e: 'beforeOpen'): void;
  (e: 'open'): void;
  (e: 'beforeClose', type: ComptCloseType): void;
  (e: 'close', type: ComptCloseType): void;
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
// drawer的动画
const leaveFrom = computed(() => {
  const TRANSFORM_MAP = {
    left: `translateX(-100%)`,
    right: `translateX(100%)`,
    top: `translateY(-100%)`,
    bottom: `translateY(100%)`,
  };
  return TRANSFORM_MAP[placement.value];
});
const enterTo = computed(() => {
  return placement.value == 'left' || placement.value == 'right'
    ? 'translateX(0)'
    : 'translateY(0)';
});
// 处理组件关闭开启
const {
  outerVisible,
  innerVisible,
  controlVisible,
  closeType,
  handleClose,
  handleAfterLeave,
} = useCloseCompt(emits, {
  visible,
  defaultVisible,
  escToClose,
  maskClosable,
});
</script>

<style lang="less" scoped>
@import './index.less';
// 内容过度
.slide-drawer-enter-from,
.slide-drawer-leave-to {
  transform: v-bind(leaveFrom);
}
.slide-drawer-enter-to,
.slide-drawer-leave-from {
  transform: v-bind(enterTo);
}
.slide-drawer-enter-active,
.slide-drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
