<template>
  <transition-group
    name="fade-message"
    moveClass="flip-list-move"
    tag="div"
    :class="['yc-message-list', `yc-message-list-${position}`]"
  >
    <yc-message
      v-for="message in messageList"
      :key="message.id"
      v-bind="message"
    />
  </transition-group>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { MessageContainerProps } from './type';
import YcMessage from './Message.vue';
const props = withDefaults(defineProps<MessageContainerProps>(), {
  messageList: () => [],
  position: 'top',
});
watch(
  () => props.messageList,
  () => {
    console.log(props.messageList, 'list');
  },
  {
    deep: true,
  }
);
</script>

<style lang="less" scoped>
@import './style/list.less';
</style>
