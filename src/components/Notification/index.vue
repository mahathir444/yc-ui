<!-- 通知提醒框 -->
<template>
  <div class="yc-notification-box">
    <div class="yc-notification-left">
      <div v-if="hasIcon" :class="['yc-notification-icon', type]">
        <slot name="icon">
          <svg-icon :name="type" />
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
    <div v-if="closable" class="yc-close-btn" @click="emits('close')">
      <slot name="closeIcon">
        <yc-icon-button name="close" class="yc-close-icon" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, computed, useSlots, ref } from 'vue';
import { NotificationProps } from './type';
import { useTimeoutFn } from '@vueuse/core';
import YcIconButton from '../_components/IconButton/index.vue';
import SvgIcon from '@/components/_components/SvgIcon/index.vue';

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
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.yc-notification-box {
  padding: 20px;
  width: 340px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 16px;
  position: relative;
  .yc-notification-left {
    display: flex;
    align-items: start;
    .yc-notification-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      &.info {
        color: rgb(22, 93, 255);
      }

      &.success {
        color: rgb(0, 180, 42);
      }

      &.warning {
        color: rgb(255, 125, 0);
      }

      &.error {
        color: rgb(245, 63, 63);
      }

      &.loading {
        color: rgb(22, 93, 225);

        .svg-icon {
          animation: loading 1s infinite cubic-bezier(0, 0, 1, 1);
        }
      }
    }
  }
  .yc-notification-right {
    flex: 1;
    color: rgb(29, 33, 41);
    .yc-notification-title {
      font-weight: 500;
      font-size: 16px;
    }
    .yc-notification-content {
      margin-top: 4px;
    }
    .yc-notification-footer {
      margin-top: 16px;
      text-align: right;
    }
  }
  .yc-close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
  }
}
</style>
