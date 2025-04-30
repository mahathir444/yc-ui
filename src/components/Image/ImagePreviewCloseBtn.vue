<template>
  <!-- close -->
  <div class="yc-image-preview-close-btn">
    <icon-close />
  </div>
</template>

<script lang="ts" setup>
import { IconClose } from '@shared/icons';
</script>

<style lang="less" scoped>
.yc-image-preview-close-btn {
  cursor: pointer;
  position: absolute;
  top: 36px;
  right: 36px;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
