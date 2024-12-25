<template>
  <a-modal
    :visible="visible"
    :title="title"
    :width="width"
    :maskClosable="false"
    :footer="false"
    title-align="start"
    draggable
    class="cx-modal"
    :class="modalClass"
    modal-class="modal-mask"
    v-bind="$attrs"
    @open="$emit('open')"
    @cancel="handleCancel"
  >
    <slot>
      <div class="modal-tip">
        <span>{{ tip }}</span>
      </div>
    </slot>
    <div class="footer" v-if="showFooter">
      <slot name="footerBtn" />
      <CxButton v-if="showCancel" @click="handleCancel">
        {{ cancelText }}
      </CxButton>
      <CxButton
        type="primary"
        :loading="confirmLoading"
        :disabled="confirmDisabled"
        @click="handleOk"
      >
        {{ confirmText }}
      </CxButton>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { toRefs, computed, watch } from 'vue';
import useKeyboardStore from '@/store/keyboard';
import { storeToRefs } from 'pinia';
import CxButton from './package/Button.vue';
const props = withDefaults(
  defineProps<{
    tip?: string;
    visible?: boolean;
    confirmLoading?: boolean;
    confirmDisabled?: boolean;
    confirmText?: string;
    cancelText?: string;
    modalClass?: string;
    showFooter?: boolean;
    showCancel?: boolean;
  }>(),
  {
    visible: false,
    okLoading: false,
    confirmDisabled: false,
    confirmText: '确认',
    cancelText: '取消',
    showFooter: true,
    showCancel: true,
  }
);
const emits = defineEmits<{
  (e: 'ok'): void;
  (e: 'cancel'): void;
  (e: 'update:visible', value: boolean): void;
  (e: 'open'): void;
  (e: 'close'): void;
}>();
const { tip, visible } = toRefs(props);
const { isModalOpen } = storeToRefs(useKeyboardStore());
// title计算
const title = computed(() => (tip.value ? '提示' : ''));
const width = computed(() => (tip.value ? 460 : 600));
const handleCancel = () => {
  if (tip.value) {
    emits('update:visible', false);
  }
  emits('cancel');
};
const handleOk = () => {
  if (tip.value) {
    emits('update:visible', false);
  }
  emits('ok');
};

watch(
  () => visible.value,
  (v) => {
    isModalOpen.value = v;
  }
);
</script>

<style lang="less">
.cx-modal {
  .arco-modal-mask {
    background: rgba(246, 249, 255, 0.5);
  }
  .arco-modal {
    border-radius: 10px !important;
    box-shadow: 0px 2px 12px 0px rgba(0, 37, 89, 0.2);
    .arco-modal-header {
      height: 53px;
      padding: 0 30px;
      display: flex;
      align-items: center;
      box-shadow: 0px -1px 0px 0px #f2f2f2 inset;
      border: none;
      position: relative;
      .arco-modal-title {
        color: #131b26;
        font-family: 'Microsoft YaHei';
        font-size: 18px;
        font-weight: 400;
      }
      .arco-modal-close-btn {
        .arco-icon-hover {
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          height: 16px;
          width: 16px;
          background: url('../../assets/icons/modal-close.svg') no-repeat;
          background-size: 100%;
          svg {
            display: none;
          }
          &::before {
            display: none;
          }
        }
      }
    }
    .arco-modal-body {
      padding: 0;
      .modal-tip {
        padding: 31.5px 30px 35.5px 30px;
        span {
          height: 26px;
          line-height: 26px;
          color: #474c59;
          font-family: 'PingFang SC';
          font-size: 16px;
          font-weight: 400;
        }
      }
      .footer {
        border-radius: 0px 0px 10px 10px;
        border-top: 1px solid #f2f2f2;
        height: 66px;
        padding: 0 30px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .el-button {
          width: 74px;
          height: 32px;
        }
      }
    }
  }
}
</style>
