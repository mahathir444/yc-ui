<template>
  <div
    :class="['yc-menu', MENU_DIRECTION_MAP[mode], MENU_THEME_MAP[theme]]"
    :style="{
      width: computedCollapsed ? collapsedWidth + 'px' : '',
    }"
  >
    <div class="yc-menu-inner" ref="menuRef">
      <slot />
    </div>
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
import { ref, computed } from 'vue';
import { MenuProps, MenuEmits } from './type';
import { MENU_DIRECTION_MAP, MENU_THEME_MAP } from '@shared/constants';
import { mediaQueryHandler } from '@shared/utils';
import { IconMenuFold, IconMenuUnfold } from '@shared/icons';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'Menu',
});
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
const { provide } = useProvide();
const { computedCollapsed, _collapsedWidth, breakpoint } = provide(
  props,
  emits,
  menuRef
);
// 收缩的宽度
const collapsedWidth = computed(() => _collapsedWidth.value + 'px');
// 处理点击
const handleClick = () => {
  computedCollapsed.value = !computedCollapsed.value;
};
// 媒体查询
mediaQueryHandler((_, order, i) => {
  if (!breakpoint.value) return;
  computedCollapsed.value = i <= order[breakpoint.value];
});
</script>

<style lang="less" scoped>
@import './style/menu.less';
@import './style//menu-item.less';
</style>
