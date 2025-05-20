<template>
  <slot />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { TabPaneProps, TabPaneSlots } from './type';
import { isUndefined } from '@shared/utils';
import useContext from './hooks/useContext';
defineOptions({
  name: 'TabPane',
});
defineSlots<TabPaneSlots>();
const props = withDefaults(defineProps<TabPaneProps>(), {
  title: '',
  path: '',
  disabled: false,
  closable: false,
  destoryOnHide: undefined,
});
// 接收注入
const { inject } = useContext();
const {
  computedActiveKey,
  emits,
  destoryOnHide: _destoryOnHide,
} = inject(props);
// hide desctory
const destoryOnHide = computed(() => {
  if (!isUndefined(props.destoryOnHide)) return props.destoryOnHide;
  return _destoryOnHide.value;
});
</script>
