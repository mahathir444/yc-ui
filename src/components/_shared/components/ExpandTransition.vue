<template>
  <transition name="expand" v-bind="transitions">
    <slot />
  </transition>
</template>

<script lang="ts" setup>
// 过渡时间
const transitions: Record<string, any> = {
  onBeforeEnter(el: HTMLDivElement) {
    el.style.height = '0';
    el.style.opacity = '0';
  },
  onEnter(el: HTMLDivElement) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.opacity = '1';
  },
  onAfterEnter(el: HTMLDivElement) {
    el.style.height = '';
  },
  onBeforeLeave(el: HTMLDivElement) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.opacity = '1';
  },
  onLeave(el: HTMLDivElement) {
    el.style.height = '0';
    el.style.opacity = '0';
  },
  onAfterLeave(el: HTMLElement) {
    el.style.height = '';
  },
};
</script>

<style lang="less" scoped>
// menu收缩动画
.expand-enter-active,
.expand-leave-active {
  transition:
    height 0.2s cubic-bezier(0.34, 0.69, 0.1, 1),
    opacity 0.2s cubic-bezier(0.3, 1.3, 0.3, 1);
}
</style>
