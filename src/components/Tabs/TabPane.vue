<template>
  <div class="yc-tabs-pane">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import useContext from './hooks/useContext';
import { TabPaneProps, TabPaneSlots } from './type';
defineOptions({
  name: 'TabPane',
});
defineSlots<TabPaneSlots>();
withDefaults(defineProps<TabPaneProps>(), {
  title: '',
  path: '',
  disabled: false,
  closable: false,
  destoryOnHide: undefined,
});
// 接收注入
const { inject } = useContext();
const { getTabPane } = inject();

// onMounted(() => {
//   getTabPane();
// });
</script>
