<template>
  <div class="yc-color-picker">
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
defineProps<{
  color: string;
  showText: boolean;
}>();
</script>

<style lang="less" scoped>
.yc-color-picker {
  cursor: pointer;
  padding: 4px;
  background-color: rgb(242, 243, 245);
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  &:hover {
    background-color: rgb(229, 230, 235);
  }
  .yc-color-picker-preview {
    width: 24px;
    height: 24px;
    color: rgb(29, 33, 41);
    font-weight: 400;
  }
}
</style>
