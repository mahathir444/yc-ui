<template>
  <div :class="[`yc-image-preview-arrow-${type}`]">
    <icon-arrow-right :rotate="type == 'left' ? 180 : 0" />
  </div>
</template>

<script lang="ts" setup>
import { IconArrowRight } from '@shared/icons';
defineProps<{
  type: 'left' | 'right';
}>();
</script>

<style lang="less" scoped>
.yc-image-preview-arrow-right,
.yc-image-preview-arrow-left {
  cursor: pointer;
  position: absolute;
  z-index: 2;
  width: 32px;
  height: 32px;
  color: #fff;
  background-color: #ffffff4d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ffffff80;
  }
}
.yc-image-preview-arrow-left {
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}
.yc-image-preview-arrow-right {
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
</style>
