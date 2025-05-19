<template>
  <div
    role="listitem"
    :class="['yc-list-item', `yc-list-item-${actionLayout}`]"
  >
    <!-- main -->
    <div class="yc-list-item-main">
      <!-- meta -->
      <div v-if="$slots.meta" class="yc-list-item-meta">
        <slot name="meta" />
      </div>
      <!-- content -->
      <div class="yc-list-item-content">
        <slot />
      </div>
      <!-- action -->
      <div
        v-if="$slots.actions && actionLayout == 'vertical'"
        class="yc-list-item-action"
      >
        <slot name="actions" />
      </div>
    </div>
    <!-- action -->
    <div
      v-if="$slots.actions && actionLayout == 'horizontal'"
      class="yc-list-item-action"
    >
      <slot name="actions" />
    </div>
    <!-- extra -->
    <div class="list-item-extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ListItemProps, ListItemSlots } from './type';
defineOptions({
  name: 'ListItem',
});
defineSlots<ListItemSlots>();
withDefaults(defineProps<ListItemProps>(), {
  actionLayout: 'horizontal',
});
</script>

<style lang="less" scoped>
.yc-list-item {
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .yc-list-item-main {
    flex: 1;
  }
  .yc-list-item-action {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
.yc-list-item-horizontal {
}
.yc-list-item-vertical {
}
</style>
