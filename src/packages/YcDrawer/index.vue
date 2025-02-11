<template>
  <Teleport :to="popupContainer" :disabled="renderToBody">
    <Transition name="fade">
      <div
        v-show="drawerVisible"
        class="yc-drawer-wrapper"
        :style="{
          zIndex,
        }"
      >
        <div v-if="mask" class="yc-drawer-mask" @click="handleMaskClose"></div>
        <Transition name="slide-drawer">
          <div v-if="visible" class="yc-drawer-container" :style="style">
            <!-- header -->
            <slot name="header">
              <div v-if="header" class="yc-drawer-header">
                <div class="yc-drawer-header-title text-ellipsis">
                  <slot name="title">
                    <span>{{ title }}</span>
                  </slot>
                </div>
                <div
                  v-if="closable"
                  class="yc-drawer-close-icon"
                  @click="handleBtnClose"
                >
                  <svg-icon
                    name="drawerClose"
                    size="12"
                    color="rgb(29,33,41)"
                  />
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
                <YcButton v-if="!hideCancel" @click="handleCancel">
                  {{ cancelText }}
                </YcButton>
                <YcButton type="primary" @click="handleOk">{{
                  okText
                }}</YcButton>
              </div>
            </slot>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { toRefs, computed, ref, watch, CSSProperties } from 'vue';
import { POSTION_MAP, BORDER_MAP } from './index.ts';
import { YcDrawerProps } from './type';
import { sleep } from '@/utils/fn';
import { useMagicKeys, whenever } from '@vueuse/core';
import YcButton from '../YcButton/index.vue';
const props = withDefaults(defineProps<YcDrawerProps>(), {
  visible: false,
  placement: 'bottom',
  title: '',
  mask: true,
  maskClosable: true,
  closable: true,
  okText: '确认',
  cancelText: '取消',
  okButtonProps: () => {
    return {};
  },
  cancelButtonProps: () => {
    return {};
  },
  width: 250,
  height: 250,
  renderToBody: true,
  popupContainer: 'body',
  drawerStyle: () => {
    return {};
  },
  zIndex: 1001,
  header: true,
  footer: true,
  escToClose: true,
  hideCancel: false,
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
const { width, height, zIndex, placement, visible, maskClosable, drawerStyle } =
  toRefs(props);
// drawer的可见性
const drawerVisible = ref<boolean>(false);
// drawer绝对定位的left,top
const style = computed(() => {
  return {
    ...POSTION_MAP[placement.value],
    ...BORDER_MAP[placement.value],
    height:
      placement.value == 'left' || placement.value == 'right'
        ? '100%'
        : `${height.value}px`,
    width:
      placement.value == 'left' || placement.value == 'right'
        ? `${width.value}px`
        : `100%`,
    zIndex: zIndex.value + 10,
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
// 处理点击关闭按钮drawer关闭
const handleBtnClose = () => {
  emits('update:visible', false);
};
// 处理点击mask关闭
const handleMaskClose = () => {
  if (!maskClosable.value) return;
  emits('update:visible', false);
};
// 处理esc关闭
const handleEscClose = () => {
  const keys = useMagicKeys();
  whenever(keys.escape, () => {
    emits('update:visible', false);
  });
};
handleEscClose();
//处理确认
const handleOk = () => {
  emits('ok');
  emits('update:visible', false);
};
// 处理取消
const handleCancel = () => {
  emits('cancel');
  emits('update:visible', false);
};
// 检测抽屉的开关
watch(
  () => visible.value,
  async (v) => {
    if (!v) {
      emits('beforeClose');
      await sleep(300);
      emits('close');
      drawerVisible.value = v;
    } else {
      drawerVisible.value = v;
      emits('beforeOpen');
      await sleep(300);
      emits('open');
    }
  },
  {
    immediate: true,
  }
);
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
