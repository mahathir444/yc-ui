<template>
  <yc-breadcrumb-item>
    <condition-render :render="slots['more-icon']">
      <icon-more v-if="!$slots['more-icon']" />
    </condition-render>
  </yc-breadcrumb-item>
</template>

<script lang="ts" setup>
import { Slots } from 'vue';
import { IconMore } from '@shared/icons';
import { ConditionRender } from '@shared/components';
import YcBreadcrumbItem from './BreadcrumbItem.vue';
defineProps<{
  slots: Slots;
}>();
</script>
