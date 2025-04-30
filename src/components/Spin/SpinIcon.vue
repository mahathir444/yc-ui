<template>
  <div v-if="!hideIcon" class="yc-spin-icon">
    <slot name="icon">
      <icon-loading v-if="!dot" name="loading" :size="size" />
      <spin-dot v-else />
    </slot>
  </div>
  <div v-if="tip" class="yc-spin-tip">
    <slot name="tip">
      {{ tip }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
import SpinDot from './SpinDot.vue';
import { IconLoading } from '@shared/icons';
defineProps<{
  dot: boolean;
  tip: string;
  size: number;
  hideIcon: boolean;
}>();
</script>

<style lang="less" scoped>
@import './style/spin.less';
</style>
