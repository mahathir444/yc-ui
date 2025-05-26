<template>
  <div class="yc-tabs-content-item">
    <div
      v-if="!destoryOnHide || computedActiveKey == path"
      class="yc-tabs-pane"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useContext from './hooks/useContext';
import { TabPaneProps, TabPaneSlots } from './type';
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
const { computedActiveKey, collectPanes } = inject();
// 执行收集
collectPanes(props);
</script>

<style lang="less">
@import './style/tabs.less';
</style>
