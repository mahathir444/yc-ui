<template>
  <Teleport :to="popupContainer">
    <div
      v-show="drawerVisible"
      class="yc-drawer-wrapper"
      :style="{
        zIndex,
      }"
    >
      <div v-if="mask" class="yc-drawer-mask" @click="handleMaskClose"></div>
      <Transition name="slide">
        <div v-show="visible" class="yc-drawer-container" :style="style">
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
              <YcButton @click="handleCancel">{{ cancelText }}</YcButton>
              <YcButton type="primary" @click="handleOk">{{ okText }}</YcButton>
            </div>
          </slot>
        </div>
      </Transition>
    </div>
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
  placement: 'right',
  title: '',
  mask: true,
  maskClosable: true,
  closable: true,
  unmountOnClose: false,
  width: 250,
  height: 250,
  zIndex: 1001,
  header: true,
  footer: true,
  okText: '确认',
  cancelText: '取消',
  popupContainer: 'body',
  escToClose: true,
  drawerStyle: () => {
    return {};
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
const {
  width,
  height,
  zIndex,
  placement,
  visible,
  maskClosable,
  drawerStyle,
  unmountOnClose,
} = toRefs(props);
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
    left: `translateX(-${width.value}px)`,
    right: `translateX(${width.value}px)`,
    top: `translateY(-${height.value}px)`,
    bottom: `translateY(${height.value}px)`,
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
.yc-drawer-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  .yc-drawer-mask {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(29, 33, 41, 0.6);
  }
  .yc-drawer-container {
    position: absolute;
    height: 100%;
    background-color: #fff;
    border: 1px solid rgb(229, 230, 235);
    display: flex;
    flex-direction: column;
    .yc-drawer-footer,
    .yc-drawer-body,
    .yc-drawer-header {
      flex-shrink: 0;
    }
    .yc-drawer-header {
      padding: 0 16px;
      height: 48px;
      width: 100%;
      border-bottom: 1px solid rgb(229, 230, 235);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      overflow: hidden;
      .yc-drawer-header-title {
        flex-shrink: 0;
        flex: 1;
        overflow: hidden;
        span {
          font-size: 16px;
          font-weight: 500;
          color: rgb(29, 33, 41);
        }
      }
      .yc-drawer-close-icon {
        width: 12px;
        height: 12px;
        cursor: pointer;
        position: relative;
        &:hover::before {
          display: block;
        }
        &::before {
          content: '';
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          width: 20px;
          height: 20px;
          background-color: rgb(242, 243, 245);
          border-radius: 50%;
          display: none;
        }
        .svg-icon {
          position: relative;
          z-index: 10;
        }
      }
    }
    .yc-drawer-body {
      padding: 12px 16px;
      flex: 1;
    }
    .yc-drawer-footer {
      padding: 0 16px;
      height: 64px;
      width: 100%;
      border-top: 1px solid rgb(229, 230, 235);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 12px;
    }
  }
}

.slide-enter-from,
.slide-leave-to {
  transform: v-bind(leaveFrom);
}
.slide-enter-to,
.slide-leave-from {
  transform: v-bind(enterTo);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
</style>
