<template>
  <div
    :class="{
      'yc-menu-item': true,
      'yc-menu-selected': computedSelectedKeys == path,
      'yc-menu-disabled': disabled,
    }"
    @click="handleClick"
  >
    <div
      class="yc-menu-indent"
      :style="{
        width: `${levelIndent * childLevel}px`,
        height: `${levelIndent}px`,
      }"
    ></div>
    <div v-if="$slots.icon" class="yc-menu-icon">
      <slot name="icon" />
    </div>
    <transition name="fade">
      <div v-if="!computedCollapsed" class="yc-menu-item-inner text-ellipsis">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, inject } from 'vue';
import { MenuItemProps, MenuProvide, SubMenuProvide } from './type';
import { SUBMENU_PROVIDE_KEY, MENU_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'MenuItem',
});
const props = withDefaults(defineProps<MenuItemProps>(), {
  path: '',
  disabled: false,
});
const { path, disabled } = toRefs(props);
// 接收menu注入
const { computedSelectedKeys, computedCollapsed, levelIndent, emits } =
  inject<MenuProvide>(MENU_PROVIDE_KEY, {
    computedSelectedKeys: ref(''),
    computedOpenKeys: ref([]),
    levelIndent: ref(20),
    computedCollapsed: ref(false),
    emits: () => {},
  });
// 接收submenu注入
const { childKeys, childLevel } = inject<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
  childKeys: ref<string[]>([]),
  level: ref<number>(1),
  childLevel: 0,
});
// 处理点击
const handleClick = () => {
  if (computedSelectedKeys.value == path.value || disabled.value) return;
  computedSelectedKeys.value = path.value;
  emits('menu-item-click', path.value);
};
// 收集
const collectKeys = () => {
  if (!childKeys.value.includes(path.value)) {
    childKeys.value.push(path.value);
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
  .yc-menu-icon {
    line-height: 1;
  }
  .yc-menu-indent {
    margin-right: -16px;
  }
  .yc-menu-item-inner {
    flex: 1;
  }
}
// 选中
.yc-menu-selected {
  font-weight: 500;
  background-color: rgb(242, 243, 245);
  color: rgb(22, 93, 255);
}
// 禁用
.yc-menu-disabled {
  color: rgb(201, 205, 212);
  background-color: #fff;
}
</style>
