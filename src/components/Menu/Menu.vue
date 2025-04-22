<template>
  <div
    :class="['yc-menu', MENU_DIRECTION_MAP[mode]]"
    :style="{
      width: collapsed ? `${collapsedWidth}px` : '100%',
    }"
  >
    <div class="yc-menu-inner">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, toRefs } from 'vue';
import { BreakpointName } from '@/components/Grid';
import { MENU_DIRECTION_MAP } from '@shared/constants';
import { Direction } from '@shared/type';
import { useControlValue } from '@shared/hooks';
import { mediaQueryHandler } from '@shared/utils';
defineOptions({
  name: 'Menu',
});
const props = withDefaults(
  defineProps<{
    theme?: 'light' | 'dark';
    mode?: Direction;
    selectedKeys?: string;
    defaultSelectedKeys?: string;
    openKeys?: string[];
    defaultOpenKeys?: string[];
    levelIndent?: number;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    collapsedWidth?: number;
    breakpoint?: BreakpointName;
  }>(),
  {
    theme: 'light',
    mode: 'vertical',
    selectedKeys: undefined,
    defaultSelectedKeys: '',
    openKeys: undefined,
    defaultOpenKeys: () => [],
    levelIndent: 20,
    collapsed: undefined,
    defaultCollapsed: false,
    collapsedWidth: 64,
    breakpoint: undefined,
  }
);
const emits = defineEmits<{
  (e: 'update:selectedKeys', value: string): void;
  (e: 'update:openKeys', value: string): void;
  (e: 'update:collapse', value: boolean): void;
}>();
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
    emits('update:collapse', val);
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

provide('menu-props', {
  computedSelectedKeys,
  computedOpenKeys,
  levelIndent,
  emits,
});

// 媒体查询
mediaQueryHandler((_, order, i) => {
  if (!breakpoint.value) return;
  computedCollapsed.value = i <= order[breakpoint.value];
  emits('collapse', computedCollapsed.value);
});
</script>

<style lang="less" scoped>
.yc-menu {
  .yc-menu-inner {
    padding: 4px 8px;
    width: 100%;
    height: 100%;
    overflow: auto;
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
