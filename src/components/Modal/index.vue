<template>
  <teleport :to="popupContainer" :disabled="!renderToBody">
    <div
      v-if="!unmountOnClose || outerVisible"
      v-show="outerVisible"
      class="yc-modal-container"
      :style="{
        position,
      }"
    >
      <!-- mask -->
      <transition :name="maskAnimationName" appear>
        <div
          v-if="mask"
          v-show="innerVisible"
          class="yc-modal-mask"
          :style="maskStyle"
        ></div>
      </transition>
      <!-- modal-wrapper -->
      <div class="yc-modal-wrapper" @click="handleClose('mask')">
        <transition
          :name="modalAnimationName"
          appear
          @before-enter="$emit('beforeOpen')"
          @before-leave="$emit('beforeClose', closeType)"
          @after-enter="$emit('open')"
          @after-leave="handleAfterLeave"
        >
          <!-- modal -->
          <div
            v-show="innerVisible"
            :class="[
              'yc-modal',
              // 全屏
              fullscreen ? 'yc-modal-fullscreen' : '',
              // 拖拽
              isDraggable ? 'yc-modal-draggable' : '',
              // 外被类名
              modalClass,
            ]"
            :style="modalCss"
            ref="modalRef"
            @click.stop=""
          >
            <!-- header -->
            <div class="yc-modal-header" ref="headerRef">
              <!-- title -->
              <div
                v-if="!hideTitle"
                :class="{
                  'yc-modal-title': true,
                  'text-ellipsis': true,
                  'title-align-center': titleAlign == 'center',
                }"
              >
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
            <!-- body -->
            <div class="yc-modal-body" :class="bodyClass" :style="bodyStyle">
              <slot />
            </div>
            <!-- footer -->
            <div v-if="footer" class="yc-modal-footer">
              <slot name="footer">
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
              </slot>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, CSSProperties } from 'vue';
import { ModalProps } from './type';
import { CloseType } from '@shared/type';
import useModalDraggable from '@shared/hooks/useModalDraggable';
import useModalClose from '@shared/hooks/useModalClose';
import YcButton from '@/components/Button';
defineOptions({
  name: 'Modal',
});
const props = withDefaults(defineProps<ModalProps>(), {
  visible: undefined,
  defaultVisible: false,
  width: 520,
  top: 100,
  mask: true,
  title: '',
  titleAlign: 'center',
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
  maskAnimationName: 'fade',
  modalAnimationName: 'zoom-modal',
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
  (e: 'cancel', type: CloseType): void;
  (e: 'open'): void;
  (e: 'beforeOpen'): void;
  (e: 'close', type: CloseType): void;
  (e: 'beforeClose', type: CloseType): void;
}>();
const {
  visible,
  defaultVisible,
  width,
  top,
  alignCenter,
  maskClosable,
  escToClose,
  modalStyle,
  fullscreen,
  draggable,
  renderToBody,
  popupContainer: _popupContainer,
} = toRefs(props);
const { onBeforeOk, onBeforeCancel } = props;
// 处理组件关闭开启
const {
  outerVisible,
  innerVisible,
  closeType,
  popupContainer,
  position,
  handleClose,
  handleAfterLeave,
} = useModalClose({
  visible,
  defaultVisible,
  escToClose,
  maskClosable,
  popupContainer: _popupContainer,
  renderToBody,
  onBeforeOk,
  onBeforeCancel,
  emits,
});
// headerRef,用于拖拽
const headerRef = ref<HTMLDivElement>();
// modalRef,用于获取宽高处理越界问题
const modalRef = ref<HTMLDivElement>();
// modal
const { dragStyle, isDraggable } = useModalDraggable({
  visible: innerVisible,
  draggable,
  fullscreen,
  alignCenter,
  top,
  triggerRef: headerRef,
  modalRef,
});
// modalCss
const modalCss = computed(() => {
  return {
    width: fullscreen.value ? '100%' : width.value + 'px',
    ...dragStyle.value,
    ...modalStyle.value,
  } as CSSProperties;
});
</script>

<style lang="less" scoped>
@import './style/modal.less';
</style>
