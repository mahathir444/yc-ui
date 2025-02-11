<template>
  <Teleport :to="popupContainer" :disabled="!renderToBody">
    <div
      v-if="!unmountOnClose || drawerVisible"
      v-show="drawerVisible"
      class="yc-drawer-wrapper"
    >
      <!-- mask -->
      <Transition name="fade" appear>
        <div
          v-if="mask"
          v-show="visible"
          class="yc-drawer-mask"
          @click="handleClose('mask')"
        ></div>
      </Transition>
      <!-- drawer -->
      <Transition
        name="slide-drawer"
        appear
        @before-enter="$emit('beforeOpen')"
        @before-leave="$emit('beforeClose', closeType)"
        @after-enter="$emit('open')"
        @after-leave="$emit('close', closeType)"
      >
        <div v-show="visible" class="yc-drawer-container" :style="drawerCss">
          <!-- header -->
          <slot name="header">
            <div v-if="header" class="yc-drawer-header">
              <!-- title -->
              <div class="yc-drawer-header-title text-ellipsis">
                <slot name="title">
                  <span>{{ title }}</span>
                </slot>
              </div>
              <!-- close-btn -->
              <div
                v-if="closable"
                class="yc-drawer-close-icon"
                @click="handleClose('closeBtn')"
              >
                <svg-icon name="drawerClose" size="12" color="rgb(29,33,41)" />
              </div>
            </div>
          </slot>
          <!-- body -->
          <div class="yc-drawer-body">
            <slot />
          </div>
          <!-- footer -->
          <slot name="footer">
            <div v-if="footer" class="yc-drawer-footer">
              <YcButton
                v-if="!hideCancel"
                v-bind="cancelButtonProps"
                @click="handleClose('cancelBtn')"
              >
                {{ cancelText }}
              </YcButton>
              <YcButton
                type="primary"
                :loading="okLoading"
                v-bind="okButtonProps"
                @click="handleClose('confirmBtn')"
              >
                {{ okText }}
              </YcButton>
            </div>
          </slot>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { toRefs, computed, ref, watch, CSSProperties } from 'vue';
import { DRAWER_POSTION_STYLE } from './index.ts';
import { sleep } from '@/utils/fn';
import { useMagicKeys, whenever } from '@vueuse/core';
import { DrawerProps } from './type';
import { ComptCloseType } from '@/type';
import YcButton from '@/packages/Button/index.vue';
const props = withDefaults(defineProps<DrawerProps>(), {
  visible: false,
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
  width,
  height,
  placement,
  visible,
  maskClosable,
  escToClose,
  drawerStyle,
} = toRefs(props);
// drawer的可见性
const drawerVisible = ref<boolean>(false);
// 关闭类型
const closeType = ref<ComptCloseType>('');
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
// 处理关闭
const handleClose = (type: ComptCloseType) => {
  closeType.value = type;
  // 触发事件
  if (type == 'confirmBtn') {
    emits('ok');
  } else {
    emits('cancel', closeType.value);
  }
  // 关闭
  if (type == 'mask') {
    if (!maskClosable.value) return;
    emits('update:visible', false);
  } else {
    emits('update:visible', false);
  }
};
// 检测抽屉的开关
watch(
  () => visible.value,
  async (v) => {
    if (v) {
      closeType.value = '';
      drawerVisible.value = v;
    } else {
      await sleep(300);
      drawerVisible.value = v;
    }
  },
  {
    immediate: true,
  }
);

// 处理esc关闭
const initHotKeys = () => {
  const keys = useMagicKeys();
  whenever(keys.escape, () => {
    if (!escToClose.value) return;
    handleClose('esc');
  });
};
initHotKeys();
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
