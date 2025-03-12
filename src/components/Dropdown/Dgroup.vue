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
import { DgroupProps } from './type';
defineOptions({
  name: 'Dgroup',
});
defineProps<DgroupProps>();
</script>

<style lang="less" scoped>
@import './style/dgroup.less';
</style>
