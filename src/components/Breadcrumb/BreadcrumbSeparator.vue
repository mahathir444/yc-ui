<template>
  <span class="yc-breadcrumb-item-separator">
    <condition-render :render="renderSeparator">
      <icon-separator v-if="!showSeparator" />
    </condition-render>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { BreadcrumbSeparator } from './type';
import { ConditionRender } from '@shared/components';
import { IconSeparator } from '@shared/icons';
import { isUndefined } from '@shared/utils';
const props = defineProps<{
  separatorSlots?: () => any;
  separator?: BreadcrumbSeparator;
  itemSeparatorSlots?: () => any;
  itemSeparator?: BreadcrumbSeparator;
}>();
const showSeparator = computed(() => {
  if (isUndefined(props.itemSeparatorSlots)) {
    return props.separatorSlots || props.separator;
  } else {
    return (
      props.itemSeparatorSlots ||
      props.itemSeparator ||
      props.separatorSlots ||
      props.separator
    );
  }
});
const renderSeparator = () => {
  if (isUndefined(props.itemSeparatorSlots)) {
    return props.separatorSlots?.() || props.separator;
  } else {
    return (
      props.itemSeparatorSlots?.() ||
      props.itemSeparator ||
      props.separatorSlots?.() ||
      props.separator
    );
  }
};
</script>

<style lang="less" scoped>
@import './style/breadcrumb-item.less';
</style>
