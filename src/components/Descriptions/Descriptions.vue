<template>
  <div></div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { DescriptionsProps, DescriptionsSlots } from './type';
defineOptions({
  name: 'Descriptions',
});
defineSlots<DescriptionsSlots>();
withDefaults(defineProps<DescriptionsProps>(), {
  data: () => [],
  column: 3,
  title: '',
  layout: 'horizontal',
  align: 'left',
  size: 'medium',
  bordered: false,
  labelStyle: () => {
    return {};
  },
  valueStyle: () => {
    return {};
  },
  tableLayout: 'auto',
});
</script>

<style lang="less" scoped></style>
