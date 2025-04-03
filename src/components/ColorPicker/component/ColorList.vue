<template>
  <div class="yc-color-picker-colors-section">
    <div class="yc-color-picker-colors-text">{{ label }}</div>
    <div v-if="!colors.length" class="yc-color-picker-colors-empty">暂无</div>
    <div class="yc-color-picker-colors-list">
      <div
        v-for="(color, index) in colors"
        :key="index"
        class="yc-color-picker-color-block"
        :style="{
          backgroundColor: color,
        }"
        @click="$emit('colorClick', color)"
      >
        <div
          class="yc-color-picker-block"
          :style="{
            backgroundColor: color,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
  colors: string[];
}>();
defineEmits<{
  (e: 'colorClick', color: string): void;
}>();
</script>

<style lang="less" scoped>
.yc-color-picker-colors-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  .yc-color-picker-colors-text {
    color: rgb(29, 33, 41);
    font-weight: 400;
    font-size: 12px;
  }
  .yc-color-picker-colors-empty {
    margin: 6px 0 0 0;
    color: rgb(134, 144, 156);
    font-size: 12px;
  }
  .yc-color-picker-colors-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 4px;
    .yc-color-picker-color-block {
      cursor: pointer;
      width: 16px;
      height: 16px;
      overflow: hidden;
      background-image: conic-gradient(
        rgba(0, 0, 0, 0.06) 0 25%,
        transparent 0 50%,
        rgba(0, 0, 0, 0.06) 0 75%,
        transparent 0
      );
      background-size: 8px 8px;
      border-radius: 2px;
      transition: transform ease-out 60ms;
      &:hover {
        transform: scale(1.1);
      }
      .yc-color-picker-block {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
