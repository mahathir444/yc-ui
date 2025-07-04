<template>
  <slot>
    <component :is="render" />
  </slot>
</template>

<script lang="ts" setup>
import { VNode } from 'vue';
import { ObjectData } from '@shared/type';
defineProps<{
  render?: ((...args: any) => any) | VNode | ObjectData;
}>();
</script>
