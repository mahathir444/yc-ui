<template>
  <div
    :class="[
      'yc-menu',
      MENU_DIRECTION_MAP[mode],
      MENU_THEME_MAP[theme],
      computedCollapsed ? 'yc-menu-collapsed' : '',
    ]"
  >
    <div class="yc-menu-inner">
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
import { provide, toRefs, computed } from 'vue';
import { MenuProps, MenuProvide, MenuEmits } from './type';
import {
  MENU_DIRECTION_MAP,
  MENU_PROVIDE_KEY,
  MENU_THEME_MAP,
} from '@shared/constants';
import { useControlValue } from '@shared/hooks';
import { mediaQueryHandler } from '@shared/utils';
import { IconMenuFold, IconMenuUnfold } from '@shared/icons';
defineOptions({
  name: 'Menu',
});
const props = withDefaults(defineProps<MenuProps>(), {
  theme: 'light',
  mode: 'horizontal',
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
// 解构属性
const {
  selectedKeys,
  defaultSelectedKeys,
  openKeys,
  defaultOpenKeys,
  levelIndent,
  collapsed,
  defaultCollapsed,
  breakpoint,
  accordion,
  autoOpen,
  theme,
  triggerProps,
  tooltipProps,
  autoOpenSelected,
  mode,
  popupMaxHeight,
  collapsedWidth: _collapsedWidth,
} = toRefs(props);
// 选中的key
const computedSelectedKeys = useControlValue<string>(
  selectedKeys,
  defaultSelectedKeys.value,
  (val) => {
    emits('update:selectedKeys', val);
  }
);
// 收缩状态
const computedCollapsed = useControlValue<boolean>(
  collapsed,
  defaultCollapsed.value,
  (val) => {
    if (true) {
      computedOpenKeys.value = [];
    }
    emits('update:collapsed', val);
  }
);
// 展开的key
const computedOpenKeys = useControlValue<string[]>(
  openKeys,
  defaultOpenKeys.value,
  (val) => {
    emits('update:openKeys', val);
  }
);
// 收缩的宽度
const collapsedWidth = computed(() => _collapsedWidth.value + 'px');
// 注入数据
provide<MenuProvide>(MENU_PROVIDE_KEY, {
  computedSelectedKeys,
  computedOpenKeys,
  computedCollapsed,
  levelIndent,
  accordion,
  autoOpen,
  triggerProps,
  tooltipProps,
  mode,
  autoOpenSelected,
  popupMaxHeight,
  emits,
});
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
// 收缩
.yc-menu-collapsed {
  width: v-bind(collapsedWidth) !important;
}
</style>
