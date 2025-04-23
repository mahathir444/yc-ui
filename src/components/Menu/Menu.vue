<template>
  <div
    :class="['yc-menu', MENU_DIRECTION_MAP[mode]]"
    :style="{
      width: computedCollapsed ? `${collapsedWidth}px` : '',
    }"
  >
    <div class="yc-menu-inner">
      <slot />
    </div>
    <div
      v-if="showCollapseButton"
      class="yc-menu-collapse-button"
      @click="handleClick"
    >
      <icon-menu-fold v-if="!computedCollapsed" />
      <icon-menu-unfold v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide, toRefs } from 'vue';
import { MenuProvide, MenuEmits } from './type';
import { Direction } from '@shared/type';
import { BreakpointName } from '@/components/Grid';
import { MENU_DIRECTION_MAP, MENU_PROVIDE_KEY } from '@shared/constants';
import { IconMenuFold, IconMenuUnfold } from '@shared/icons';
import { useControlValue } from '@shared/hooks';
import { mediaQueryHandler } from '@shared/utils';
defineOptions({
  name: 'Menu',
});
const props = withDefaults(
  defineProps<{
    theme?: 'light' | 'dark';
    mode?: Direction;
    levelIndent?: number;
    autoOpen?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    collapsedWidth?: number;
    accordion?: boolean;
    autoScrollIntoView?: boolean;
    showCollapseButton?: boolean;
    selectedKeys?: string;
    defaultSelectedKeys?: string;
    openKeys?: string[];
    defaultOpenKeys?: string[];
    breakpoint?: BreakpointName;
  }>(),
  {
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
    breakpoint: undefined,
  }
);
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
  collapsedWidth,
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
// 处理点击
const handleClick = () => {
  computedCollapsed.value = !computedCollapsed.value;
};
// 注入数据
provide<MenuProvide>(MENU_PROVIDE_KEY, {
  computedSelectedKeys,
  computedOpenKeys,
  computedCollapsed,
  levelIndent,
  emits,
});
// 媒体查询
mediaQueryHandler((_, order, i) => {
  if (!breakpoint.value) return;
  computedCollapsed.value = i <= order[breakpoint.value];
});
</script>

<style lang="less" scoped>
.yc-menu {
  position: relative;
  transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  .yc-menu-inner {
    padding: 4px 8px;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .yc-menu-collapse-button {
    cursor: pointer;
    position: absolute;
    right: 12px;
    bottom: 12px;
    width: 24px;
    height: 24px;
    border-radius: 2px;
    font-size: 14px;
    color: rgb(134, 144, 156);
    background-color: rgb(247, 248, 250);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: rgb(229, 230, 235);
    }
  }
}
// mode
.yc-menu-direction-vertical {
  height: 100%;
}
.yc-menu-direction-horizontal {
  width: 100%;
}
</style>
