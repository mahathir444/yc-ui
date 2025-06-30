<template>
  <transition-group
    name="fade-message"
    moveClass="flip-list-move"
    tag="div"
    :class="['yc-message-list', `yc-message-list-${position}`]"
  >
    <!-- :resetFlag="item.resetFlag" -->
    <yc-message
      v-for="item in messageList"
      :key="item.id"
      :duration="item.duration"
      :resetOnHover="item.resetOnHover"
      :type="item.type"
      :content="item.content"
      :closable="item.closable"
      :showIcon="item.showIcon"
      @close="$emit('close', item.id)"
    />
  </transition-group>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { MessageContainerProps } from './type';
import YcMessage from './Message.vue';
withDefaults(defineProps<MessageContainerProps>(), {
  messageList: () => [],
  position: 'top',
});
</script>

<style lang="less" scoped>
.yc-message-list {
  pointer-events: none;
  z-index: 1003;
  position: fixed;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
// postion
.yc-message-list-top {
  top: 40px;
}
.yc-message-list-bottom {
  bottom: 40px;
}
</style>
