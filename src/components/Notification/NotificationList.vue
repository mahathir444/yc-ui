<template>
  <transition-group
    :name="fadeName"
    :class="['yc-notification-list', `yc-notification-list-${position}`]"
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
import { NotificationContainerProps } from './type';
const props = withDefaults(defineProps<NotificationContainerProps>(), {
  notificationList: () => [],
  position: 'topRight',
});
const fadeName = computed(() => {
  const dir = props.position.includes('Right') ? 'right' : 'left';
  return `slide-${dir}-notification`;
});
</script>
<style scoped lang="less">
@import './style/notification-list.less';
</style>
