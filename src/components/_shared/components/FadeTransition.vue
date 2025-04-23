<template>
  <transition name="fade-show" v-bind="transitions">
    <slot :show="show" />
  </transition>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    show?: boolean;
  }>(),
  {
    show: true,
  }
);
// 过渡时间
const transitions: Record<string, any> = {
  onBeforeEnter(el: HTMLDivElement) {
    el.style.opacity = '0';
  },
  onEnter(el: HTMLDivElement) {
    el.style.opacity = '1';
  },
  onBeforeLeave(el: HTMLDivElement) {
    el.style.opacity = '1';
  },
  onLeave(el: HTMLDivElement) {
    el.style.opacity = '0';
  },
};
</script>

<style lang="less" scoped>
// menu收缩动画
// .fade-show-enter-active,
// .fade-show-leave-active {
//   transition: opacity 0.2s cubic-bezier(0.3, 1.3, 0.3, 1);
// }
</style>
