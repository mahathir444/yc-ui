<template>
  <div v-if="!hideIcon" class="yc-spin-icon">
    <slot name="icon">
      <icon-loading spin v-if="!dot" name="loading" />
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
import IconLoading from '@shared/icons/IconLoading.vue';
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
}
</style>
