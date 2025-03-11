<template>
  <div class="yc-dropdown-group-title text-ellipsis">
    <slot v-if="$slots.title" name="title" />
    <template v-else>
      {{ title }}
    </template>
  </div>
  <slot />
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Dgroup',
});
defineProps<{
  title?: string;
}>();
</script>

<style lang="less" scoped>
.yc-dropdown-group-title {
  margin-top: 8px;
  padding: 0 12px;
  color: rgb(134, 144, 156);
  font-size: 12px;
  line-height: 20px;
}
</style>
