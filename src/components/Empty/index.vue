<template>
  <div class="yc-empty">
    <div class="yc-empty-image">
      <slot name="image">
        <img v-if="imgSrc" :src="imgSrc" alt="图片加载失败" />
        <svg-icon v-else name="empty" />
      </slot>
    </div>
    <div v-if="description" class="yc-empty-description">{{ description }}</div>
  </div>
</template>

<script lang="ts" setup>
import { EmptyProps } from './type';
defineOptions({
  name: 'Empty',
});
withDefaults(defineProps<EmptyProps>(), {
  description: '',
  imgSrc: '',
});
</script>

<style lang="less" scoped>
.yc-empty {
  width: 100%;
  height: 100%;
  padding: 10px 0;
  color: rgb(169, 174, 184);
  line-height: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  .yc-empty-image {
    width: 48px;
    height: 48px;
    font-size: 48px;
    color: inherit;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
  .yc-empty-description {
    font-size: 14px;
  }
}
</style>
