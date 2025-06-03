<template>
  <div
    :class="['yc-menu', `yc-menu-mode-${mode}`, `yc-menu-theme-${theme}`]"
    :style="{
      width:
        computedCollapsed && mode != 'horizontal' ? `${collapsedWidth}px` : '',
    }"
  >
    <div class="yc-menu-inner" ref="menuRef">
      <slot />
      <!-- 省略内容  -->
      <menu-ellipsis v-if="mode == 'horizontal' && max < menuTree.length" />
    </div>
    <!-- 收缩按钮 -->
    <div
      v-if="showCollapseButton && mode != 'horizontal'"
      class="yc-menu-collapse-button"
      @click="handleClick"
    >
      <icon-menu-fold v-if="!computedCollapsed" />
      <icon-menu-unfold v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MenuProps, MenuEmits, MenuSlots } from './type';
import { mediaQueryHandler } from '@shared/utils';
import { IconMenuFold, IconMenuUnfold } from '@shared/icons';
import useContext from './hooks/useContext';
import MenuEllipsis from './MenuEllipsis.vue';
defineOptions({
  name: 'Menu',
});
defineSlots<MenuSlots>();
const props = withDefaults(defineProps<MenuProps>(), {
  theme: 'light',
  mode: 'vertical',
  levelIndent: 20,
  autoOpen: false,
  collapsed: undefined,
  defaultCollapsed: false,
  collapsedWidth: 64,
  accordion: false,
  autoScrollIntoView: false,
  showCollapseButton: false,
  selectedKeys: undefined,
  defaultSelectedKeys: '',
  openKeys: undefined,
  defaultOpenKeys: () => [],
  triggerProps: () => {
    return {};
  },
  tooltipProps: () => {
    return {};
  },
  autoOpenSelected: false,
  breakpoint: undefined,
  popupMaxHeight: 167,
});
const emits = defineEmits<MenuEmits>();
// menuredf
const menuRef = ref<HTMLDivElement>();
// 注入数据
const { computedCollapsed, collapsedWidth, breakpoint, menuTree, max } =
  useContext().provide(props, emits, menuRef);
// 处理点击
const handleClick = () => {
  computedCollapsed.value = !computedCollapsed.value;
  emits('collapse', computedCollapsed.value, 'clickTrigger');
};
// 媒体查询
mediaQueryHandler((_, order, i) => {
  if (!breakpoint.value) return;
  computedCollapsed.value = i <= order[breakpoint.value];
  emits('collapse', computedCollapsed.value, 'responsive');
});
</script>

<style lang="less" scoped>
@import './style/menu.less';
</style>
