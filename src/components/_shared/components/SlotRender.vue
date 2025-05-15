<template>
  <slot>
    <component :is="render" />
  </slot>
</template>

<script lang="ts" setup>
import { VNode, Slot } from 'vue';
defineProps<{
  render: ((...args: any) => any) | Slot | VNode;
}>();
</script>
