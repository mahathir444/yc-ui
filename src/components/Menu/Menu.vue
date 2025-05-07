<template>
  <div
    :class="['yc-menu', MENU_DIRECTION_MAP[mode], MENU_THEME_MAP[theme]]"
    :style="{
      width: computedCollapsed ? collapsedWidth + 'px' : '',
    }"
  >
    <div class="yc-menu-inner" ref="menuRef">
      <slot />
      <!-- 省略内容  -->
      <menu-ellipsis
        v-if="mode == 'horizontal' && max < menuItemData.length"
        :computed-selected-keys="computedSelectedKeys"
        :max="max"
        :menu-item-data="menuItemData"
        :mode="mode"
        :theme="theme"
        :trigger-props="triggerProps"
        :popup-max-height="popupMaxHeight"
        :flatten-data="flattenData"
        @select="handleSelect"
      />
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
import { MenuProps, MenuEmits } from './type';
import { MENU_DIRECTION_MAP, MENU_THEME_MAP } from '@shared/constants';
import { mediaQueryHandler } from '@shared/utils';
import { IconMenuFold, IconMenuUnfold } from '@shared/icons';
import useProvide from './hooks/useProvide';
import MenuEllipsis from './MenuEllipsis.vue';
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
const {
  computedCollapsed,
  computedSelectedKeys,
  collapsedWidth,
  breakpoint,
  max,
  menuItemData,
  flattenData,
} = provide(props, emits, menuRef);
// 处理点击
const handleClick = () => {
  computedCollapsed.value = !computedCollapsed.value;
};
const handleSelect = (value: string) => {
  computedSelectedKeys.value = value;
  emits('menuItemClick', value);
  console.log(value, 'value');
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
