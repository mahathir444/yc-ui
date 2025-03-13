<template>
  <div v-if="!hideIcon" class="yc-spin-icon">
    <slot name="icon">
      <yc-icon v-if="!dot" name="loading" />
      <dot-icon v-else />
    </slot>
  </div>
  <div v-if="tip" class="yc-spin-tip">
    <slot name="tip">
      {{ tip }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
import DotIcon from './DotIcon.vue';
defineProps<{
  dot: boolean;
  tip: string;
  hideIcon: boolean;
}>();
</script>

<style lang="less" scoped>
.yc-spin-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .svg-icon {
    animation: loading 1s infinite cubic-bezier(0, 0, 1, 1);
  }
}
</style>
