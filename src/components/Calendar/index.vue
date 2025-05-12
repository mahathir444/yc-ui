<template>
  <div></div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { CalendarProps, CalendarEmits, CalendarSlots } from './type';
defineOptions({
  name: 'Calendar',
});
defineSlots<CalendarSlots>();
const props = withDefaults(defineProps<CalendarProps>(), {
  modelValue: undefined,
  defaultValue: '',
  mode: undefined,
  defaultMode: 'month',
  modes: () => ['month', 'year'],
});
const emits = defineEmits<CalendarEmits>();
</script>

<style lang="less" scoped></style>
