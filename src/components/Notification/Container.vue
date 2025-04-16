<!-- Message 组件容器 -->
<template>
  <transition-group
    :name="fadeName"
    tag="div"
    :class="['yc-notification-list', position]"
  >
    <yc-notification
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
    </yc-notification>
  </transition-group>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getSlotFunction } from '@shared/utils';
import YcNotification from './Notification.vue';
import { NotificationConfig, NOTIFICATION_POSITION } from './type';
const props = defineProps<{
  notificationList: NotificationConfig[];
  position: NOTIFICATION_POSITION;
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
@import './style/container.less';
</style>
