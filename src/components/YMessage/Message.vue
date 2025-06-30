<template>
  <li
    role="alert"
    :class="['yc-message', `yc-message-${type}`]"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <span
      v-if="(type != 'normal' || isFunction(icon)) && showIcon"
      class="yc-message-icon"
    >
      <component :is="icon ?? map[type]" />
    </span>
    <span class="yc-message-content">
      {{ content }}
    </span>
    <span v-if="closable" class="yc-message-close-btn">
      <icon-button :size="12" />
    </span>
  </li>
</template>

<script lang="ts" setup>
import { toRefs, onMounted, watch } from 'vue';
import { MessageProps } from './type';
import { useTimeoutFn } from '@vueuse/core';
import { isFunction } from '@shared/utils';
import {
  IconInfo,
  IconWarning,
  IconSuccess,
  IconError,
  IconLoading,
} from '@shared/icons';
import { IconButton } from '@shared/components';
defineOptions({
  name: 'Message',
});
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  content: '',
  id: '',
  showIcon: (props) => {
    return props.type != 'normal';
  },
  closable: false,
  icon: undefined,
  duration: 1500,
  onClose: undefined,
  onDestory: undefined,
  resetOnHover: false,
});
const { type, id, duration, resetOnHover } = toRefs(props);
const { onClose, onDestory } = props;
// icon映射
const map: Record<string, any> = {
  info: IconInfo,
  warning: IconWarning,
  success: IconSuccess,
  error: IconError,
  loading: IconLoading,
};
// 倒计时
const { isPending, start, stop } = useTimeoutFn(
  () => {
    onDestory?.(id.value);
    onClose?.(id.value);
  },
  () => duration.value,
  {
    immediate: false,
  }
);
// 处理鼠标进入
const handleMouseenter = () => {
  if (!resetOnHover.value || !isPending.value || duration.value <= 0) return;
  stop();
};
// 处理鼠标离开
const handleMouseleave = () => {
  if (!resetOnHover.value || !isPending.value || duration.value <= 0) return;
  start();
};
// 检测props
watch(props, () => {
  if (!isPending.value || duration.value <= 0) return;
  stop();
  start();
});
onMounted(() => {
  if (duration.value <= 0) return;
  start();
});
</script>

<style lang="less" scoped>
@import './style/message.less';
</style>
