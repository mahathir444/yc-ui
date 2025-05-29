<template>
  <yc-menu-item v-if="item.type == 'item'" :path="item.path">
    {{ item.title }}
  </yc-menu-item>
  <yc-sub-menu v-else :title="item.title" :path="item.path">
    <template v-for="v in item.children" :key="v.path">
      <!-- 渲染item -->
      <yc-menu-item v-if="v?.type == 'item'" :value="v.path">
        {{ item.title }}
      </yc-menu-item>
      <!-- 渲染sub -->
      <menu-content v-else :item="v" />
    </template>
  </yc-sub-menu>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'MenuContent',
});
defineProps<{
  item: {
    type: 'item' | 'submenu';
    title: string;
    path: string;
    children?: {
      type: 'item' | 'submenu';
      title: string;
      path: string;
      children?: [];
    }[];
  };
}>();
</script>
