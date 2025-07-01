<template>
  <transition-group
    :name="fadeName"
    :class="['yc-notification-list', position]"
    tag="div"
  >
    <yc-notification
      v-for="item in notificationList"
      :key="item.id"
      v-bind="item"
    />
  </transition-group>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import YcNotification from './Notification.vue';
import { NotificationConfig, NotificationPosition } from './type';
const props = defineProps<{
  notificationList: NotificationConfig[];
  position: NotificationPosition;
}>();
const emits = defineEmits(['close']);
const fadeName = computed(() => {
  const dir = props.position.includes('Right') ? 'right' : 'left';
  return `slide-${dir}-notification`;
});
</script>
<style scoped lang="less">
@import './style/container.less';
</style>
