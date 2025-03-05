<template>
  <yc-trigger
    :position="position"
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :popup-container="popupContainer"
    :arrow-class="`${arrowClass} yc-popoconfirm-popup-arrow `"
    :arrow-style="arrowStyle"
    :content-class="`${contentClass} yc-popconfirm-popup-content`"
    :content-style="computedContentStyle"
    :popup-offset="10"
    animation-name="zoom-in-fade-out"
    trigger="click"
    show-arrow
    v-bind="$attrs"
    :wrapper-class="`yc-popoconfirm ${$attrs.wrapperClass ?? ''}`"
    ref="triggerRef"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="(v) => (triggerPostion = v)"
  >
    <slot />
    <template #content>
      <div class="yc-popconfirm-body">
        <div :class="['yc-popconfirm-icon', TYPE_CLASS[type]]">
          <slot v-if="$slots.icon" name="icon" />
          <svg-icon :name="type" v-else />
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
import { ref, toRefs, computed, CSSProperties } from 'vue';
import { TriggerPostion } from '@/packages/Trigger/type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Trigger/constants';
import { TYPE_CLASS } from './constants';
import { PopconfirmProps } from './type';
import { TriggerInstance } from '@/packages/Trigger';
import YcTrigger from '@/packages/Trigger/index.vue';
import YcButton from '@/packages/Button/index.vue';
defineOptions({
  name: 'Popconfirm',
});
const props = withDefaults(defineProps<PopconfirmProps>(), {
  content: '',
  position: 'bottom',
  popupVisible: undefined,
  defaultPopupVisible: true,
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
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
  (e: 'ok'): void;
  (e: 'cancel'): void;
}>();
const { contentStyle } = toRefs(props);
// 当前的位置
const triggerPostion = ref<TriggerPostion>('bottom');
// content-style
const computedContentStyle = computed(() => {
  return {
    transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion.value],
    ...contentStyle?.value,
  } as CSSProperties;
});
// 触发器实例
const triggerRef = ref<TriggerInstance>();
// 处理确认
const handleOk = () => {
  emits('ok');
  triggerRef.value?.hide();
};
// 处理取消
const handleCancel = () => {
  emits('cancel');
  triggerRef.value?.hide();
};
</script>

<style lang="less">
@import './index.less';
</style>
