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
          <component :is="TYPE_ICON_MAP[type]" :spin="type == 'loading'" />
        </slot>
      </span>
      <span class="yc-message-content">{{ content }}</span>
      <yc-icon-button
        v-if="closable"
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
import { TYPE_ICON_MAP } from '@shared/constants';
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
@import './style/message.less';
</style>
