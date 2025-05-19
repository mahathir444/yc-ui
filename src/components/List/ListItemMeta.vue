<template>
  <div class="yc-list-item-meta">
    <div v-if="$slots.avatar" class="yc-list-item-meta-avatar">
      <slot name="avatar" />
    </div>
    <div class="yc-list-item-meta-content">
      <div v-if="$slots.title || title" class="yc-list-item-meta-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="$slots.description || description"
        class="yc-list-item-meta-description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ListItemMetaProps, ListItemMetaSlots } from './type';
defineOptions({
  name: 'ListItemMeta',
});
defineSlots<ListItemMetaSlots>();
withDefaults(defineProps<ListItemMetaProps>(), {
  title: '',
  description: '',
});
</script>

<style lang="less" scoped>
.yc-list-item-meta {
  overflow: hidden;
  padding: 4px 0;
  display: flex;
  align-items: center;
  gap: 16px;
  .yc-list-item-avatar {
    flex-shrink: 0;
  }
  .yc-list-item-meta-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .yc-list-item-meta-title {
      color: rgb(29, 33, 41);
      font-weight: 500;
    }
    .yc-list-item-meta-description {
      color: rgb(78, 89, 105);
    }
  }
}
</style>
