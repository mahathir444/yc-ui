<template>
  <yc-icon-button :size="12" :hover-size="20" class="yc-tabs-nav-button">
    <slot v-if="$slots.default" />
  </yc-icon-button>
</template>

<script lang="ts" setup>
import { YcIconButton } from '@shared/components';
</script>
