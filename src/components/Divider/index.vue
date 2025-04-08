<template>
  <div class="yc-divider" role="separator">
    <div class="arco-divider-text"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { DividerProps } from './type';
defineOptions({
  name: 'Divider',
});
withDefaults(defineProps<DividerProps>(), {
  direction: 'horizontal',
  orientation: 'center',
  type: 'solid',
  size: 1,
  margin: 20,
});
</script>

<style lang="less" scoped>
.yc-divider {
}
</style>
