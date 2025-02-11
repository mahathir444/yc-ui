<template>
  <Teleport :to="popupContainer">
    <div
      v-show="modalVisible"
      class="yc-modal-container"
      :style="{
        zIndex: 1006,
      }"
    >
      <div
        v-if="mask"
        class="yc-modal-mask"
        :style="maskStyle"
        @click="handleClose('mask')"
      ></div>
      <Transition name="modalShow">
        <div
          v-if="visible"
          class="yc-modal-wrapper"
          :class="{
            'yc-modal-wrapper-align-center': alignCenter,
          }"
        >
          <div class="yc-modal" :style="modalCss" :class="modalClass">
            <!-- header -->
            <div class="yc-modal-header">
              <div v-if="!hideTitle" class="yc-modal-title text-ellipsis">
                <slot name="title">
                  <span>{{ title }}</span>
                </slot>
              </div>
              <div
                v-if="closable"
                class="yc-modal-close-button"
                @click="handleClose('closeBtn')"
              >
                <svg-icon name="drawerClose" size="12" color="rgb(29,33,41)" />
              </div>
            </div>
            <!-- body -->
            <div class="yc-modal-body" :class="bodyClass" :style="bodyStyle">
              <slot />
            </div>
            <!-- footer -->
            <div v-if="footer" class="yc-modal-footer">
              <slot name="footer">
                <YcButton
                  v-if="!hideCancel"
                  v-bind="cancelButtonProps"
                  @click="handleClose('cancelBtn')"
                >
                  {{ cancelText }}
                </YcButton>
                <YcButton
                  type="primary"
                  v-bind="okButtonProps"
                  @click="handleClose('confirmBtn')"
                >
                  {{ okText }}
                </YcButton>
              </slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch, computed, CSSProperties } from 'vue';
import { sleep } from '@/utils/fn';
import { useMagicKeys, whenever } from '@vueuse/core';
import { YcButtonProps } from '@/packages/YcButton/type';
import YcButton from '../YcButton/index.vue';
import { ModalCloseType } from './type';
const props = withDefaults(
  defineProps<{
    visible?: boolean;
    width?: number;
    top?: number;
    mask?: boolean;
    title?: string;
    titleAlign?: 'start' | 'center';
    alignCenter?: boolean;
    maskClosable?: boolean;
    hideCancel?: boolean;
    closable?: boolean;
    okText?: string;
    cancelText?: string;
    okButtonProps?: YcButtonProps;
    cancelButtonProps?: YcButtonProps;
    footer?: boolean;
    popupContainer?: string;
    maskStyle?: CSSProperties;
    modalClass?: string;
    modalStyle?: CSSProperties;
    escToClose?: boolean;
    draggable?: boolean;
    fullscreen?: boolean;
    bodyClass?: string;
    bodyStyle?: CSSProperties;
    hideTitle?: boolean;
  }>(),
  {
    visible: false,
    width: 520,
    top: 100,
    mask: true,
    title: '测试',
    titleAlign: 'center',
    alignCenter: true,
    maskClosable: true,
    hideCancel: false,
    closable: true,
    okText: '确认',
    cancelText: '取消',
    okButtonProps: () => {
      return {};
    },
    cancelButtonProps: () => {
      return {};
    },
    footer: true,
    popupContainer: 'body',
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
  }
);
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel'): void;
  (e: 'open'): void;
  (e: 'beforeOpen'): void;
  (e: 'close', type: ModalCloseType): void;
  (e: 'beforeClose', type: ModalCloseType): void;
}>();
const {
  visible,
  width,
  top,
  alignCenter,
  maskClosable,
  escToClose,
  modalStyle,
} = toRefs(props);
// drawer的可见性
const modalVisible = ref<boolean>(false);
// 关闭类型
const closeType = ref<ModalCloseType>('');
// modalCss
const modalCss = computed(() => {
  return {
    width: width.value + 'px',
    top: alignCenter.value ? 'unset' : top.value + 'px',
    left: alignCenter.value ? 'unset' : '50%',
    transform: alignCenter.value ? 'unset' : 'translateX(-50%)',
    ...modalStyle.value,
  } as CSSProperties;
});
// 处理关闭
const handleClose = (type: ModalCloseType) => {
  if (type == 'mask') {
    if (!maskClosable.value) return;
    emits('update:visible', false);
  } else {
    if (type == 'cancelBtn') {
      emits('cancel');
    } else if (type == 'confirmBtn') {
      emits('ok');
    }
    emits('update:visible', false);
  }
};
// 处理esc关闭
const handleEscClose = () => {
  const keys = useMagicKeys();
  whenever(keys.escape, () => {
    if (!escToClose.value) return;
    handleClose('esc');
  });
};
handleEscClose();
// 检测modal的开关,处理对应的事件
watch(
  () => visible.value,
  async (v) => {
    if (v) {
      closeType.value = '';
      modalVisible.value = v;
      emits('beforeOpen');
      await sleep(300);
      emits('open');
    } else {
      emits('beforeClose', closeType.value);
      await sleep(300);
      emits('close', closeType.value);
      modalVisible.value = v;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.yc-modal-container {
  position: fixed;
  inset: 0 0 0 0;

  .yc-modal-mask {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(29, 33, 41, 0.6);
  }
  .yc-modal-wrapper {
    position: absolute;
    inset: 0 0 0 0;
    overflow: auto;
    &.yc-modal-wrapper-align-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .yc-modal {
      position: absolute;
      background-color: #fff;
      border-radius: 4px;
      .yc-modal-header {
        padding: 0 16px;
        height: 48px;
        width: 100%;
        border-bottom: 1px solid rgb(229, 230, 235);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        overflow: hidden;
        .yc-modal-title {
          flex-shrink: 0;
          flex: 1;
          overflow: hidden;
          span {
            font-size: 16px;
            font-weight: 500;
            color: rgb(29, 33, 41);
          }
        }
        .yc-modal-close-button {
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
      .yc-modal-body {
        padding: 24px 20px;
        overflow: auto;
        color: rgb(29, 33, 41);
        font-size: 14px;
      }
      .yc-modal-footer {
        padding: 16px 20px;
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
}
</style>
