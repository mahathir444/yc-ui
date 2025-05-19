<template>
  <div></div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { TabPaneProps, TabPaneSlots } from './type';
defineOptions({
  name: 'TabPane',
});
defineSlots<TabPaneSlots>();
const props = withDefaults(defineProps<TabPaneProps>(), {});
</script>

<style lang="less" scoped></style>
