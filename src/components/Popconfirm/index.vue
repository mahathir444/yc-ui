<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :position="position"
    :popup-container="popupContainer"
    :arrow-class="`${arrowClass} yc-popoconfirm-popup-arrow`"
    :arrow-style="arrowStyle"
    :content-class="`${contentClass} yc-popconfirm-popup-content`"
    :content-style="contentStyle"
    :popup-offset="10"
    :class="`yc-popoconfirm ${$attrs.class ?? ''}`"
    trigger="click"
    animation-name="zoom-in-fade-out"
    need-transform-origin
    show-arrow
    ref="triggerRef"
    v-bind="$attrs"
  >
    <slot />
    <template #content>
      <div class="yc-popconfirm-body">
        <div class="yc-popconfirm-icon">
          <slot v-if="$slots.icon" name="icon" />
          <component
            v-else
            :is="TYPE_ICON_MAP[type]"
            :color="TYPE_ICON_COLOR_MAP[type]"
          />
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
import { ref, toRefs } from 'vue';
import { PopconfirmProps } from './type';
import { TYPE_ICON_MAP, TYPE_ICON_COLOR_MAP } from '@shared/constants';
import { useOnBeforeClose, useControlValue } from '@shared/hooks';
import YcTrigger, { TriggerInstance } from '@/components/Trigger';
import YcButton from '@/components/Button';
defineOptions({
  name: 'Popconfirm',
});
const props = withDefaults(defineProps<PopconfirmProps>(), {
  content: '',
  position: 'bottom',
  popupVisible: void 0,
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
  popupContainer: void 0,
  onBeforeOk: () => true,
  onBeforeCancel: () => true,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel'): void;
}>();
const { popupVisible, defaultPopupVisible, type } = toRefs(props);
const { onBeforeOk, onBeforeCancel } = props;
// 触发器实例
const triggerRef = ref<TriggerInstance>();
// 受控的visible
const computedVisible = useControlValue<boolean>(
  popupVisible,
  defaultPopupVisible.value,
  (val) => {
    emits('update:popupVisible', val);
    emits('popup-visible-change', val);
  }
);
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
@import './style/popconfirm.less';
</style>
