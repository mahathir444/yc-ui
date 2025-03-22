<!-- Message 组件容器 -->
<template>
  <transition-group
    name="fade-message"
    moveClass="flip-list-move"
    tag="div"
    class="yc-message-container"
  >
    <message
      v-for="item in messageList"
      :key="item.id"
      :duration="item.duration"
      :resetOnHover="item.resetOnHover"
      :resetFlag="item.resetFlag"
      :type="item.type"
      :content="item.content"
      :closable="item.closable"
      :showIcon="item.showIcon"
      @close="$emit('close', item.id)"
    >
      <template #icon v-if="item.icon">
        <component :is="item.icon" />
      </template>
    </message>
  </transition-group>
</template>

<script setup lang="ts">
import Message from './Message.vue';
import { MessageContainerProps } from './type';
defineProps<MessageContainerProps>();
const emits = defineEmits(['close']);
defineOptions({
  name: 'MessageContainer',
});
</script>
<style scoped lang="less">
@import './style/container.less';
</style>
