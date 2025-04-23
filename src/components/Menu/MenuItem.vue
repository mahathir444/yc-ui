<template>
  <div
    :class="{
      'yc-menu-item': true,
      'yc-menu-item-selected': isSelected,
      'yc-menu-item-disabled': disabled,
    }"
    @click="handleClick"
  >
    <div
      v-if="level"
      class="yc-menu-indent"
      :style="{
        width: `${levelIndent * level}px`,
        height: `${levelIndent}px`,
      }"
    ></div>
    <div v-if="$slots.icon" class="yc-menu-icon">
      <slot name="icon" />
    </div>
    <!-- content -->
    <div
      class="yc-menu-item-title text-ellipsis"
      :style="{
        width: computedCollapsed ? 0 : '',
      }"
    >
      <slot />
    </div>
    <!-- suffix -->
    <div v-if="$slots.suffix" class="yc-menu-icon-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, inject, computed } from 'vue';
import { MenuItemProps, MenuProvide, SubMenuProvide } from './type';
import { SUBMENU_PROVIDE_KEY, MENU_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'MenuItem',
});
const props = withDefaults(defineProps<MenuItemProps>(), {
  path: '',
  disabled: false,
  // 用于菜单的header
  isSubmenu: false,
});
const emits = defineEmits<{
  (e: 'click'): void;
}>();
const { path, disabled, isSubmenu } = toRefs(props);
// 接收menu注入
const {
  computedSelectedKeys,
  computedCollapsed,
  levelIndent,
  emits: _emits,
} = inject<MenuProvide>(MENU_PROVIDE_KEY, {
  computedSelectedKeys: ref(''),
  computedOpenKeys: ref([]),
  levelIndent: ref(20),
  computedCollapsed: ref(false),
  accordion: ref(false),
  emits: () => {},
});
// 接收submenu注入
const { childKeys, childLevel, submenuLevel } = inject<SubMenuProvide>(
  SUBMENU_PROVIDE_KEY,
  {
    childKeys: ref([]),
    level: ref(1),
    childLevel: 0,
    submenuLevel: 1,
  }
);
// 层级
const level = computed(() => {
  return isSubmenu.value ? submenuLevel : childLevel;
});
// 是否选中
const isSelected = computed(() => {
  if (isSubmenu.value) {
    const target = childKeys.value.find(
      (item) => item.path == computedSelectedKeys.value
    );
    if (!target) {
      return false;
    }
    return submenuLevel <= target?.level;
  }
  return computedSelectedKeys.value == path.value;
});
// 处理点击
const handleClick = () => {
  if (isSubmenu.value) {
    return emits('click');
  }
  if (computedSelectedKeys.value == path.value || disabled.value) {
    return;
  }
  computedSelectedKeys.value = path.value;
  _emits('menuItemClick', path.value);
};
// 收集
const collectKeys = () => {
  if (isSubmenu.value) return;
  const index = childKeys.value.findIndex((item) => item.path == path.value);
  if (index == -1) {
    childKeys.value.push({
      level: childLevel - 1,
      path: path.value,
    });
  }
};
collectKeys();
</script>

<style lang="less" scoped>
.yc-menu-item {
  overflow: hidden;
  cursor: pointer;
  padding: 0 12px;
  margin-bottom: 4px;
  background-color: #fff;
  border-radius: 2px;
  line-height: 40px;
  color: rgb(78, 89, 105);
  font-size: 14px;
  transition: color 0.2s cubic-bezier(0, 0, 1, 1);
  display: flex;
  align-items: center;
  gap: 16px;
  &:not(.yc-menu-disabled) {
    &:hover {
      background-color: rgb(242, 243, 245);
    }
  }
  .yc-menu-indent {
    margin-right: -16px;
  }
  .yc-menu-icon {
    line-height: 1;
  }
  .yc-menu-item-title {
    flex: 1;
    flex-shrink: 0;
  }
}
// 选中
.yc-menu-item-selected {
  font-weight: 500;
  background-color: rgb(242, 243, 245);
  color: rgb(22, 93, 255);
}
// 禁用
.yc-menu-item-disabled {
  color: rgb(201, 205, 212);
  background-color: #fff;
}
</style>
