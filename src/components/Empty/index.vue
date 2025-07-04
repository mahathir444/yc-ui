<template>
  <div class="yc-empty">
    <div class="yc-empty-image">
      <slot name="image">
        <condition-render :render="IconEmpty">
          <img v-if="imgSrc" :src="imgSrc" alt="图片加载失败" />
        </condition-render>
      </slot>
    </div>
    <div v-if="description" class="yc-empty-description">{{ description }}</div>
  </div>
</template>

<script lang="ts" setup>
import { EmptyProps, EmptySlots } from './type';
import { IconEmpty } from '@shared/icons';
import { ConditionRender } from '@shared/components';
defineOptions({
  name: 'Empty',
});
defineSlots<EmptySlots>();
withDefaults(defineProps<EmptyProps>(), {
  description: '暂无数据',
  imgSrc: '',
});
</script>

<style lang="less" scoped>
@import './style/empty.less';
</style>
