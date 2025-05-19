<template>
  <div></div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { TabProps, TabEmits, TabSlots } from './type';
defineOptions({
  name: 'Tab',
});
defineSlots<TabSlots>();
const props = withDefaults(defineProps<TabProps>(), {});
defineEmits<TabEmits>();
</script>

<style lang="less" scoped></style>
