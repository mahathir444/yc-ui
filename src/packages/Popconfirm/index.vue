<template>
  <yc-trigger
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :trigger="trigger"
    :popup-container="popupContainer"
    :render-to-body="renderToBody"
    :position="position"
    :disabled="disabled"
    :popup-offset="popupOffset"
    :popup-translate="popupTranslate"
    :show-arrow="showArrow"
    :blur-to-close="blurToClose"
    :click-to-close="clickToClose"
    :unmount-on-close="unmountOnClose"
    :animation-name="animationName"
    :duration="duration"
    :mouse-enter-delay="mouseEnterDelay"
    :mouse-leave-delay="mouseLeaveDelay"
    :focus-delay="focusDelay"
    :auto-fit-popup-width="autoFitPopupWidth"
    :auto-fit-popup-min-width="autoFitPopupMinWidth"
    wrapper-class="yc-popoconfirm"
    :arrow-class="`${arrowClass ?? ''} yc-popoconfirm-popup-arrow `"
    :arrow-style="arrowStyle"
    :content-class="`${contentClass ?? ''} yc-popconfirm-popup-content`"
    :content-style="computedContentStyle"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="(v) => (triggerPostion = v)"
    ref="triggerRef"
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
import { ref, toRefs, computed, CSSProperties, Reactive } from 'vue';
import { TriggerPostion } from '@/packages/Trigger/type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Trigger/constants';
import { TYPE_CLASS } from './constants';
import { PopconfirmProps } from './type';
import { TriggerInstance } from '@/packages/Trigger';
import YcTrigger from '../Trigger/index.vue';
import YcButton from '../Button/index.vue';
defineOptions({
  name: 'Popconfirm',
});
const props = withDefaults(defineProps<PopconfirmProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  position: 'bottom',
  disabled: false,
  popupOffset: 10,
  popupTranslate: () => [0, 0],
  showArrow: true,
  blurToClose: true,
  clickOutsideToClose: true,
  clickToClose: true,
  unmountOnClose: true,
  contentStyle: () => {
    return {};
  },
  arrowStyle: () => {
    return {};
  },
  animationName: 'zoom-in-fade-out',
  duration: 400,
  mouseEnterDelay: 1000,
  mouseLeaveDelay: 100,
  focusDelay: 100,
  autoFitPopupWidth: false,
  autoFitPopupMinWidth: false,
  popupContainer: 'body',
  renderToBody: true,
  content: '',
  okText: '确定',
  cancelText: '取消',
  type: 'info',
  okLoading: false,
  okButtonProps: () => {
    return {};
  },
  cancelButtonProps: () => {
    return {};
  },
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
  (e: 'ok'): void;
  (e: 'cancel'): void;
}>();
const { popupTranslate, contentStyle } = toRefs(props);
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
.yc-trigger {
  &.yc-popoconfirm {
    .yc-popconfirm-popup-content {
      padding: 16px;
      color: rgb(78, 89, 105);
      font-size: 14px;
      line-height: 1.5715;
      background-color: #fff;
      border: 1px solid rgb(229, 230, 235);
      border-radius: 4px;
      box-shadow: 0 4px 10px #0000001a;
      display: flex;
      flex-direction: column;
      gap: 16px;
      .yc-popconfirm-body {
        display: flex;
        align-items: center;
        gap: 8px;
        .yc-popconfirm-icon {
          font-size: 18px;
          height: 22px;
          width: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgb(22, 93, 255);
          &.yc-popconfirm-info {
            color: rgb(22, 93, 255);
          }
          &.yc-popconfirm-success {
            color: rgb(0, 180, 42);
          }
          &.yc-popconfirm-warning {
            color: rgb(255, 125, 0);
          }
          &.yc-popconfirm-error {
            color: rgb(245, 63, 63);
          }
        }
        .yc-popconfirm-content {
          text-align: left;
          word-wrap: break-word;
        }
      }
      .yc-popconfirm-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
      }
    }
    .yc-trigger-arrow {
      z-index: 1;
      border: 1px solid rgb(229, 230, 235);
    }
  }
}
</style>
