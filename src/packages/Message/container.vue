<!-- Message 组件容器 -->
<template>
  <TransitionGroup name="fade-message" moveClass="flip-list-move" tag="div" class="yc-message-container">
    <Message 
    v-for="item in messageList" 
    :key="item.id"
    :duration="item.duration"
    :resetOnHover="item.resetOnHover"
    :resetFlag="item.resetFlag"
    :type="item.type"
    :content="item.content"
    :closable="item.closable"
    :showIcon="item.showIcon"
    @remove="$emit('close', item.id)">
      <template #icon v-if="item.icon">
        <component :is="item.icon" />
      </template>
    </Message>
  </TransitionGroup>
</template>

<script setup lang='ts'>
import Message from './index.vue';
import { MessageContainerProps } from './type';
defineProps<MessageContainerProps>();
const emits = defineEmits(['close'])
defineOptions({
  name: 'MessageContainer',
});
</script>
<style scoped lang='less' >
.yc-message-container {
  width: 100%;
  position: fixed;
  z-index: 1000;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.fade-message-enter-from,
.fade-message-appear-from {
  opacity: 0;
}

.fade-message-enter-to,
.fade-message-appear-to {
  opacity: 1;
}

.fade-message-enter-active,
.fade-message-appear-active {
  transition: opacity 0.1s cubic-bezier(0, 0, 1, 1);
}

.fade-message-leave-from {
  opacity: 1;
}

.fade-message-leave-to {
  opacity: 0;
}

.fade-message-leave-active {
  position: absolute;
  // top: 0;
  // transition: opacity 0.1s cubic-bezier(0, 0, 1, 1);
}

.flip-list-move {
  transition: transform 0.2s ease;
}
</style>