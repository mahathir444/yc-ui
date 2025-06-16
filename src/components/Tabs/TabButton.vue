<template>
  <yc-icon-button
    :size="12"
    :hover-size="20"
    :class="{
      'yc-tabs-nav-button': className,
    }"
    hover-color="rgb(242,243,245)"
    v-bind="$attrs"
  >
    <slot v-if="$slots.default" />
  </yc-icon-button>
</template>

<script lang="ts" setup>
import { YcIconButton } from '@shared/components';
withDefaults(
  defineProps<{
    className?: boolean;
  }>(),
  {
    className: true,
  }
);
</script>
