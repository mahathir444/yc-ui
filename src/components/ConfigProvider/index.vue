<template>
  <slot />
</template>

<script lang="ts" setup>
import { toRefs, provide } from 'vue';
import { ConfigProviderProps, ConfigProviderProvide } from './type';
import { CONFIG_PROVIDER_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'ConfigProvider',
});
const props = withDefaults(defineProps<ConfigProviderProps>(), {
  zIndex: 1001,
  size: undefined,
  popupContainer: 'body',
  updateAtScroll: true,
  scrollToClose: false,
  exchangeTime: true,
});
const {
  zIndex,
  size,
  updateAtScroll,
  scrollToClose,
  exchangeTime,
  popupContainer,
} = toRefs(props);
provide<ConfigProviderProvide>(CONFIG_PROVIDER_PROVIDE_KEY, {
  zIndex,
  size,
  updateAtScroll,
  scrollToClose,
  exchangeTime,
  popupContainer,
});
</script>
