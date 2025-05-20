<template>
  <slot />
</template>

<script lang="ts" setup>
import { TabPaneProps, TabPaneSlots } from './type';
defineOptions({
  name: 'TabPane',
});
defineSlots<TabPaneSlots>();
withDefaults(defineProps<TabPaneProps>(), {
  title: '',
  path: '',
  disabled: false,
  closable: false,
  destoryOnHide: undefined,
});
</script>
