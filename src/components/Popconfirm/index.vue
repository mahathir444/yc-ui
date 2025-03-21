<template>
  <yc-trigger
    :position="position"
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :popup-container="popupContainer"
    :arrow-class="`${arrowClass} yc-popoconfirm-popup-arrow `"
    :arrow-style="arrowStyle"
    :content-class="`${contentClass} yc-popconfirm-popup-content`"
    :content-style="contentStyle"
    :popup-offset="10"
    :class="`yc-popoconfirm ${$attrs.class ?? ''}`"
    animation-name="zoom-in-fade-out"
    show-arrow
    need-transform-origin
    trigger="click"
    ref="triggerRef"
    v-bind="$attrs"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
  >
    <slot />
    <template #content>
      <div class="yc-popconfirm-body">
        <div :class="['yc-popconfirm-icon', TYPE_CLASS[type]]">
          <slot v-if="$slots.icon" name="icon" />
          <yc-icon :name="type" v-else />
        </div>
        <div class="yc-popconfirm-content">
          <slot v-if="$slots.content" name="content" />
          <template v-else>{{ content }}</template>
        </div>
      </div>
      <div class="yc-popconfirm-footer">
        <yc-button size="mini" v-bind="cancelButtonProps" @click="handleCancel">
          {{ cancelText }}
        </yc-button>
        <yc-button
          size="mini"
          type="primary"
          :loading="okLoading"
          v-bind="okButtonProps"
          @click="handleOk"
        >
          {{ okText }}
        </yc-button>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TYPE_CLASS } from './constants';
import { PopconfirmProps } from './type';
import useOnBeforeClose from '@/components/_hooks/useOnBeforeClose';
import YcTrigger, { TriggerInstance } from '@/components/Trigger';
import YcButton from '@/components/Button';
defineOptions({
  name: 'Popconfirm',
});
const props = withDefaults(defineProps<PopconfirmProps>(), {
  content: '',
  position: 'bottom',
  popupVisible: undefined,
  defaultPopupVisible: false,
  type: 'info',
  okText: '确定',
  cancelText: '取消',
  okLoading: false,
  okButtonProps: () => {
    return {};
  },
  cancelButtonProps: () => {
    return {};
  },
  contentClass: '',
  contentStyle: () => {
    return {};
  },
  arrowClass: '',
  arrowStyle: () => {
    return {};
  },
  popupContainer: 'body',
  onBeforeOk: () => true,
  onBeforeCancel: () => true,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel'): void;
}>();
const { onBeforeOk, onBeforeCancel } = props;
// 触发器实例
const triggerRef = ref<TriggerInstance>();
// 处理确认
const handleOk = () => {
  const isClose = useOnBeforeClose('confirmBtn', onBeforeOk, onBeforeCancel);
  if (!isClose) return;
  emits('ok');
  triggerRef.value?.hide();
};
// 处理取消
const handleCancel = () => {
  const isClose = useOnBeforeClose('cancelBtn', onBeforeOk, onBeforeCancel);
  if (!isClose) return;
  emits('cancel');
  triggerRef.value?.hide();
};
</script>

<style lang="less">
@import './style/index.less';
</style>
