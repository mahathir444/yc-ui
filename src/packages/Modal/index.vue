<template>
  <Teleport :to="popupContainer" :disabled="!renderToBody">
    <div
      v-if="!unmountOnClose || modalVisible"
      v-show="modalVisible"
      class="yc-modal-container"
    >
      <!-- mask -->
      <Transition :name="maskAnimationName || 'fade'" appear>
        <div
          v-if="mask"
          v-show="visible"
          class="yc-modal-mask"
          :style="maskStyle"
        ></div>
      </Transition>
      <!-- modal-wrapper -->
      <div
        class="yc-modal-wrapper"
        :class="{
          'yc-modal-wrapper-align-center': alignCenter,
        }"
        @click="handleClose('mask')"
      >
        <Transition
          :name="modalAnimationName || 'zoom-modal'"
          appear
          @before-enter="$emit('beforeOpen')"
          @before-leave="$emit('beforeClose', closeType)"
          @after-enter="$emit('open')"
          @after-leave="$emit('close', closeType)"
        >
          <!-- modal -->
          <div
            v-show="visible"
            :class="[
              'yc-modal',
              fullscreen ? 'yc-modal-fullscreen' : '',
              modalClass,
            ]"
            :style="modalCss"
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
              >
                <slot name="title">
                  <span>{{ title }}</span>
                </slot>
              </div>
              <!-- close-btn -->
              <CloseButton
                v-if="closable"
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
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch, computed, CSSProperties } from 'vue';
import { sleep } from '@/utils/fn';
import { useMagicKeys, whenever } from '@vueuse/core';
import { ComptCloseType } from '@/type';
import { ModalProps } from './type';
import YcButton from '@/packages/Button/index.vue';
import CloseButton from '@/components/CloseButton/index.vue';
const props = withDefaults(defineProps<ModalProps>(), {
  visible: false,
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
  width,
  top,
  alignCenter,
  maskClosable,
  escToClose,
  modalStyle,
  fullscreen,
} = toRefs(props);
// drawer的可见性
const modalVisible = ref<boolean>(false);
// 关闭类型
const closeType = ref<ComptCloseType>('');
// modalCss
const modalCss = computed(() => {
  return {
    width: fullscreen.value ? '100%' : width.value + 'px',
    margin: '0 auto',
    top: alignCenter.value ? 'unset' : top.value + 'px',
    ...modalStyle.value,
  } as CSSProperties;
});
// 处理关闭
const handleClose = (type: ComptCloseType) => {
  console.log('函数触发了');
  closeType.value = type;
  // 关闭
  if (type == 'mask') {
    if (!maskClosable.value) return;
    emits('update:visible', false);
  } else {
    emits('update:visible', false);
  }
  // 触发事件
  if (type == 'confirmBtn') {
    emits('ok');
  } else {
    emits('cancel', closeType.value);
  }
};
// 检测modal的开关处理对应的显影
watch(
  () => visible.value,
  async (v) => {
    if (v) {
      closeType.value = '';
      modalVisible.value = v;
    } else {
      await sleep(400);
      modalVisible.value = v;
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
</style>
