<template>
  <div :class="['yc-color-picker', COLOR_PICKER_SIZE_CLASS[size]]">
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
import { COLOR_PICKER_SIZE_CLASS } from '@shared/constants';
import { Size } from '@shared/type';
defineProps<{
  color: string;
  showText: boolean;
  size: Size;
}>();
</script>

<style lang="less" scoped>
@import '../style/color-panel.less';
</style>
