<template>
  <slot />
</template>

<script lang="ts" setup>
import { ConfigProviderProps } from './type';
import { useConfigProvder } from '@shared/hooks';
const props = withDefaults(defineProps<ConfigProviderProps>(), {
  zIndex: 1001,
  size: 'medium',
  popupContainer: undefined,
  updateAtScroll: true,
  scrollToClose: false,
  exchangeTime: true,
});
const { ProvideConfig } = useConfigProvder();
ProvideConfig(props);
</script>
