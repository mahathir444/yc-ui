<!-- Message 组件容器 -->
<template>
  <TransitionGroup
    :name="fadeName"
    tag="div"
    :class="['yc-notification-list', position]"
  >
    <Notification
      v-for="item in notificationList"
      :key="item.id"
      :duration="item.duration"
      :type="item.type"
      :closable="item.closable"
      :showIcon="item.showIcon"
      :resetFlag="item.resetFlag"
      :style="item.style"
      :class="item.class"
      @close="$emit('close', item.id, position)"
    >
      <template #icon v-if="item.icon">
        <component :is="getSlotFunction(item.icon)" />
      </template>
      <template #title>
        <component :is="getSlotFunction(item.title)" />
      </template>
      <template #content>
        <component :is="getSlotFunction(item.content)" />
      </template>
      <template #footer>
        <component :is="getSlotFunction(item.footer)" />
      </template>
      <template #closeIcon v-if="item.closeIcon">
        <component :is="getSlotFunction(item.closeIcon)" />
      </template>
    </Notification>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getSlotFunction } from '../_utils/vue-utils';
import Notification from './index.vue';
import { NotificationConfig, NotificationPosition } from './type';
const props = defineProps<{
  notificationList: NotificationConfig[];
  position: NotificationPosition;
}>();
const emits = defineEmits(['close']);
defineOptions({
  name: 'NotificationContainer',
});
const fadeName = computed(() => {
  const dir = props.position.includes('Right') ? 'right' : 'left';
  return `slide-${dir}-notification`;
});
</script>
<style scoped lang="less">
@offset: 20px;
.yc-notification-list {
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  &.topLeft,
  &.topRight {
    top: @offset;
  }
  &.bottomLeft,
  &.bottomRight {
    bottom: @offset;
  }
  &.topLeft,
  &.bottomLeft {
    left: @offset;
  }
  &.topRight,
  &.bottomRight {
    right: @offset;
  }
}

.slide-left-notification-enter-from,
.slide-left-notification-appear-from {
  transform: translateX(-100%);
}

.slide-left-notification-enter-to,
.slide-left-notification-appear-to {
  transform: translateX(0);
}

.slide-left-notification-enter-active,
.slide-left-notification-appear-active {
  transition: transform 0.4s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.slide-left-notification-leave-from {
  opacity: 1;
}

.slide-left-notification-leave-to {
  height: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
}

.slide-left-notification-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
}

.slide-right-notification-enter-from,
.slide-right-notification-appear-from {
  transform: translateX(100%);
}

.slide-right-notification-enter-to,
.slide-right-notification-appear-to {
  transform: translateX(0);
}

.slide-right-notification-enter-active,
.slide-right-notification-appear-active {
  transition: transform 0.4s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.slide-right-notification-leave-from {
  opacity: 1;
}

.slide-right-notification-leave-to {
  height: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
}

.slide-right-notification-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
