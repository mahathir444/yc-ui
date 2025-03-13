<!-- 消息 -->
<template>
  <transition name="fade" appear>
    <div
      class="yc-message-box"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave"
    >
      <span v-if="hasIcon" :class="['yc-message-icon', type]">
        <slot name="icon">
          <yc-icon :name="type" class="svg-icon" />
        </slot>
      </span>
      <span class="yc-message-content">{{ content }}</span>
      <yc-icon-button
        v-if="closable"
        name="close"
        class="yc-message-close"
        @click="emits('close')"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref, computed, useSlots } from 'vue';
import { MessageProps } from './type';
import { useTimeoutFn } from '@vueuse/core';
import YcIconButton from '../_components/IconButton/index.vue';

defineOptions({
  name: 'Message',
});
const props = withDefaults(defineProps<MessageProps>(), {
  content: '',
  id: '',
  showIcon: false,
  closable: false,
  duration: 1000,
  resetOnHover: false,
  type: 'info',
  resetFlag: false,
});
const emits = defineEmits<{
  (e: 'close'): void;
}>();
const { isPending, start, stop } = useTimeoutFn(
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
const handleMouseenter = () => {
  if (!props.resetOnHover) return;
  if (!isPending.value) return;
  stop();
};
const handleMouseleave = () => {
  if (!props.resetOnHover) return;
  if (isPending.value) return;
  if (props.duration === 0) return;
  start();
};
const hasIcon = computed(() => {
  return props.showIcon || !(props.type === 'normal' && !slots.icon);
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

.yc-message-box {
  padding: 10px 16px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  gap: 8px;

  .yc-message-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;

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
</style>
