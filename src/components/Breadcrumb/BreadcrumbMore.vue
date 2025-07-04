<template>
  <yc-breadcrumb-item>
    <component v-if="$slots['more-icon']" :is="slots['more-icon']" />
    <icon-more v-else />
  </yc-breadcrumb-item>
</template>

<script lang="ts" setup>
import { Slots } from 'vue';
import { IconMore } from '@shared/icons';
import YcBreadcrumbItem from './BreadcrumbItem.vue';
defineProps<{
  slots: Slots;
}>();
</script>
