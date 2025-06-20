<!-- 通知提醒框 -->
<template>
  <div :class="['yc-notification-box', `yc-notification-box-${type}`]">
    <div class="yc-notification-left">
      <div v-if="hasIcon" class="yc-notification-icon">
        <slot name="icon">
          <component :is="TYPE_ICON_MAP[type]" />
        </slot>
      </div>
    </div>
    <div class="yc-notification-right">
      <div class="yc-notification-title">
        <slot name="title" />
      </div>
      <div class="yc-notification-content">
        <slot name="content" />
      </div>
      <div class="yc-notification-footer">
        <slot name="footer" />
      </div>
    </div>
    <icon-button v-if="closable" class="yc-close-btn" @click="emits('close')">
      <slot v-if="$slots['close-icon']" name="close-icon"> </slot>
    </icon-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, computed, useSlots, ref } from 'vue';
import { NotificationProps } from './type';
import { useTimeoutFn } from '@vueuse/core';
import { TYPE_ICON_MAP } from '@shared/constants';
import { IconButton } from '@shared/components';
defineOptions({
  name: 'Notification',
});
const props = withDefaults(defineProps<NotificationProps>(), {
  id: '',
  showIcon: true,
  closable: false,
  duration: 1000,
  type: 'info',
  resetFlag: false,
});
const emits = defineEmits<{
  (e: 'close'): void;
}>();
const { start, stop } = useTimeoutFn(
  () => {
    emits('close');
  },
  () => props.duration,
  {
    immediate: false,
  }
);
const resetFlag = ref(props.resetFlag);

const slots = useSlots();
onUpdated(() => {
  if (props.duration === 0) return;
  if (props.resetFlag === resetFlag.value) return;
  resetFlag.value = props.resetFlag;
  stop();
  start();
});
onMounted(async () => {
  if (props.duration === 0) return;
  start();
});

const hasIcon = computed(() => {
  return true || props.showIcon || slots.icon;
});
</script>
<style scoped lang="less">
@import './style/natification.less';
</style>
