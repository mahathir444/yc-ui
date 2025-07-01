<template>
  <li
    role="alert"
    :class="['yc-notification', `yc-notification-${type}`, className]"
    :style="style"
  >
    <div class="yc-notification-left">
      <div v-if="showIcon" class="yc-notification-icon">
        <component :is="icon ?? TYPE_ICON_MAP[type]" />
      </div>
    </div>
    <div class="yc-notification-right">
      <div class="yc-notification-title">
        <component :is="getSlotFunction(title)" />
      </div>
      <div class="yc-notification-content">
        <component :is="getSlotFunction(content)" />
      </div>
      <div v-if="isFunction(footer)" class="yc-notification-footer">
        <component :is="footer" />
      </div>
    </div>
    <div class="yc-notification-close-btn">
      <component v-if="closeIconElement" :is="closeIconElement" />
      <icon-button v-else :size="12" :hover-size="20">
        <component v-if="closeIcon" :is="closeIcon" />
      </icon-button>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, watch } from 'vue';
import { NotificationProps } from './type';
import { TYPE_ICON_MAP } from '@shared/constants';
import { getSlotFunction, isFunction } from '@shared/utils';
import { IconButton } from '@shared/components';
import { useTimeoutFn } from '@vueuse/core';
defineOptions({
  name: 'Notification',
});
const props = withDefaults(defineProps<NotificationProps>(), {
  type: 'info',
  title: '',
  content: '',
  icon: undefined,
  id: '',
  style: () => {
    return {};
  },
  class: '',
  showIcon: true,
  closable: false,
  duration: 3000,
  footer: undefined,
  closeIcon: undefined,
  closeIconElement: undefined,
  onClose: undefined,
});
const { type, id, duration, class: className } = toRefs(props);
const { onClose, onDestory } = props;
// 倒计时
const { start, stop } = useTimeoutFn(
  () => {
    onDestory?.(id.value);
    onClose?.(id.value);
  },
  () => duration.value,
  {
    immediate: false,
  }
);
// 检测props
watch(props, () => {
  if (duration.value <= 0) return;
  stop();
  start();
});
onMounted(() => {
  if (duration.value <= 0) return;
  start();
});
</script>

<style lang="less" scoped>
.yc-notification {
  overflow: hidden;
  position: relative;
  width: 340px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: 1;
  transition: opacity 0.2s cubic-bezier(0, 0, 1, 1);
  display: flex;
  gap: 16px;
  .yc-notification-left {
    .yc-notification-icon {
      font-size: 24px;
      display: flex;
      align-items: center;
    }
  }
  .yc-notification-right {
    color: rgb(29, 33, 41);
    flex: 1;
    display: flex;
    flex-direction: column;

    .yc-notification-title {
      font-weight: 500;
      font-size: 16px;
    }
    .yc-notification-content {
      margin-top: 4px;
      font-size: 14px;
    }
    .yc-notification-footer {
      margin-top: 12px;
      text-align: right;
    }
  }
  .yc-notification-close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    color: rgb(29, 33, 41);
    font-size: 12px;
  }
}
// type
@type: {
  info: rgb(22, 93, 255);
  warning: rgb(255, 125, 0);
  success: rgb(0, 180, 42);
  error: rgb(245, 63, 63);
  loading: rgb(22, 93, 255);
};
each(@type,{
    .yc-notification-@{key}{
      & when not(@key = normal){
        background-color: #fff;
        border-color: rgb(229,230,235);
      }
      .yc-notification-icon{
        color: @value;
      }
    };
  });
</style>
