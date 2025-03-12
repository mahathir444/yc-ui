<template>
  <div class="yc-option-group-label text-ellipsis">
    <slot v-if="$slots.label" name="label" />
    <template v-else>
      {{ label }}
    </template>
  </div>
  <slot />
</template>

<script lang="ts" setup>
import { OptgroupProps } from './type';
defineOptions({
  name: 'Optgroup',
});
defineProps<OptgroupProps>();
</script>

<style lang="less" scoped>
@import './style/option-group.less';
</style>
