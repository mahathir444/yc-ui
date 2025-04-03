<template>
  <div :class="['yc-color-picker', SIZE_CLASS[size]]">
    <div
      class="yc-color-picker-preview"
      :style="{
        backgroundColor: color,
      }"
    ></div>
    <span v-if="showText" class="arco-color-picker-value">
      {{ color }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { SIZE_CLASS } from '../constants';
import { Size } from '@shared/type';
defineProps<{
  color: string;
  showText: boolean;
  size: Size;
}>();
</script>

<style lang="less" scoped>
@import '../style/color-preview.less';
</style>
