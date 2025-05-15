<template>
  <component v-if="slots.loading" :is="slots.loading" />
  <icon-loading v-else :size="!isSizeInherit ? size : undefined" />
</template>

<script lang="ts" setup>
import { IconLoading } from '@shared/icons';
defineProps<{
  isSizeInherit: boolean;
  size: number;
}>();
import { useConfigProvder } from '@shared/hooks';
const { slots } = useConfigProvder();
</script>
