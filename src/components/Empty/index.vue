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
@import './style/index.less';
</style>
