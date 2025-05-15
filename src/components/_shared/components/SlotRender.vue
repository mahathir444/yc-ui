<template>
  <slot>
    <component :is="render" />
  </slot>
</template>

<script lang="ts" setup>
import { VNode } from 'vue';
defineProps<{
  render?: ((...args: any) => any) | VNode;
}>();
</script>
