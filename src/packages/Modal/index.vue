<template>
  <teleport :to="popupContainer" :disabled="!renderToBody">
    <div
      v-if="!unmountOnClose || outerVisible"
      v-show="outerVisible"
      class="yc-modal-container"
    >
      <!-- mask -->
      <transition :name="maskAnimationName || 'fade'" appear>
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
          :name="modalAnimationName || 'zoom-modal'"
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
            @click.stop="() => {}"
          >
            <!-- header -->
            <div class="yc-modal-header">
              <!-- title -->
              <div
                v-if="!hideTitle"
                :class="{
                  'yc-modal-title': true,
                  'text-ellipsis': true,
                  'title-align-center': titleAlign == 'center',
                }"
                ref="headerRef"
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
import { ComptCloseType } from '@/type';
import { ModalProps } from './type';
import useModalDraggable from '@/hooks/useModalDraggable';
import useCloseCompt from '@/hooks/useCloseCompt';
import YcButton from '@/packages/Button/index.vue';
import YcIconButton from '@/components/IconButton/index.vue';
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
});
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel', type: ComptCloseType): void;
  (e: 'open'): void;
  (e: 'beforeOpen'): void;
  (e: 'close', type: ComptCloseType): void;
  (e: 'beforeClose', type: ComptCloseType): void;
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
} = toRefs(props);
// 处理组件关闭开启
const { outerVisible, innerVisible, closeType, handleClose, handleAfterLeave } =
  useCloseCompt(emits, {
    visible,
    defaultVisible,
    escToClose,
    maskClosable,
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
@import './index.less';
</style>
