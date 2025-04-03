<template>
  <div
    class="yc-color-picker-preview"
    :style="{
      backgroundColor: color,
    }"
  ></div>
</template>

<script lang="ts" setup>
defineProps<{
  color: string;
}>();
</script>

<style lang="less" scoped>
.yc-color-picker-preview {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
