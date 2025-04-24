<template>
  <teleport :to="popupContainer" :disabled="!renderToBody">
    <div
      v-if="!unmountOnClose || outerVisible"
      v-show="outerVisible"
      :class="{
        'yc-modal-container': true,
        'yc-modal-position-absolute': popupContainer || !renderToBody,
        'yc-modal-simple': simple,
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
      <div class="yc-modal-wrapper" @click="handleClose('mask', $event)">
        <transition
          :name="modalAnimationName"
          appear
          @before-enter="$emit('beforeOpen')"
          @before-leave="$emit('beforeClose')"
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
              // 外面传入的类名
              $attrs.class,
            ]"
            :style="style"
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
                v-if="closable && !simple"
                class="yc-modal-close-button"
                @click="handleClose('closeBtn', $event)"
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
                  @click="handleClose('cancelBtn', $event)"
                >
                  {{ cancelText }}
                </yc-button>
                <yc-button
                  type="primary"
                  :loading="okLoading"
                  v-bind="okButtonProps"
                  @click="handleClose('confirmBtn', $event)"
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
import { ref, toRefs, computed, CSSProperties, useAttrs } from 'vue';
import { ModalProps } from './type';
import { useConfigProvder } from '@shared/hooks';
import useModalClose from './hooks/useModalClose';
import useModalDraggable from './hooks/useModalDraggable';
import YcButton from '@/components/Button';
import { YcIconButton } from '@shared/components';
defineOptions({
  name: 'Modal',
  inheritAttrs: false,
});
const props = withDefaults(defineProps<ModalProps>(), {
  visible: undefined,
  defaultVisible: false,
  width: 400,
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
  simple: false,
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
  (e: 'cancel', ev: MouseEvent | KeyboardEvent): void;
  (e: 'open'): void;
  (e: 'beforeOpen'): void;
  (e: 'close'): void;
  (e: 'beforeClose'): void;
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
} = toRefs(props);
const { onBeforeOk, onBeforeCancel } = props;
const attrs = useAttrs();
// 接收属性
const { popupContainer, zIndex } = useConfigProvder(props);
// 处理组件关闭开启
const { outerVisible, innerVisible, handleClose, handleAfterLeave } =
  useModalClose({
    visible,
    defaultVisible,
    escToClose,
    maskClosable,
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
const style = computed(() => {
  return {
    width: fullscreen.value ? '100%' : width.value + 'px',
    ...dragStyle.value,
    ...modalStyle.value,
    ...(attrs.style || {}),
  } as CSSProperties;
});
</script>

<style lang="less" scoped>
@import './style/modal.less';
.yc-modal-container {
  z-index: v-bind(zIndex);
}
</style>
