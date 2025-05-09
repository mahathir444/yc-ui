<template>
  <div class="yc-dropdown-group-title text-ellipsis">
    <slot name="title">
      {{ title }}
    </slot>
  </div>
  <slot />
</template>

<script lang="ts" setup>
import { DgroupProps, DgroupSlots } from './type';
defineOptions({
  name: 'Dgroup',
});
defineSlots<DgroupSlots>();
defineProps<DgroupProps>();
</script>

<style lang="less" scoped>
@import './style/dgroup.less';
</style>
