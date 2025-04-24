<template>
  <yc-tooltip
    position="lt"
    :content="title"
    :disabled="isSubmenu || !computedCollapsed"
  >
    <div
      :class="[
        'yc-menu-item',
        isSelected ? 'yc-menu-item-selected' : '',
        disabled ? 'yc-menu-item-disabled' : '',
      ]"
      @click="handleClick"
    >
      <div
        v-if="level && !computedCollapsed"
        v-show="!computedCollapsed"
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
        v-show="!computedCollapsed"
        class="yc-menu-item-title text-ellipsis"
        ref="titleRef"
      >
        <slot />
      </div>
      <!-- suffix -->
      <div
        v-if="$slots.suffix"
        v-show="!computedCollapsed"
        class="yc-menu-icon-suffix"
      >
        <slot name="suffix" />
      </div>
    </div>
  </yc-tooltip>
</template>

<script lang="ts" setup>
import { ref, toRefs, inject, computed, onMounted } from 'vue';
import { MenuItemProps, MenuProvide, SubMenuProvide } from './type';
import { SUBMENU_PROVIDE_KEY, MENU_PROVIDE_KEY } from '@shared/constants';
import { getTextContent } from '@shared/utils';
import YcTooltip from '@/components/Tooltip';
defineOptions({
  name: 'MenuItem',
});
const props = withDefaults(defineProps<MenuItemProps>(), {
  path: '',
  disabled: false,
  isSubmenu: false,
});
const { path, disabled, isSubmenu } = toRefs(props);
// 接收menu注入
const {
  computedSelectedKeys,
  computedOpenKeys,
  computedCollapsed,
  levelIndent,
  autoOpen,
  accordion,
  emits: _emits,
} = inject<MenuProvide>(MENU_PROVIDE_KEY, {
  computedSelectedKeys: ref(''),
  computedOpenKeys: ref([]),
  levelIndent: ref(20),
  computedCollapsed: ref(false),
  accordion: ref(false),
  autoOpen: ref(false),
  emits: () => {},
});
// 接收submenu注入
const { childKeys, childLevel } = inject<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
  childKeys: ref([]),
  level: ref(1),
  childLevel: 0,
});
// title容器
const titleRef = ref<HTMLDivElement>();
// title
const title = computed(() => {
  return titleRef.value ? getTextContent(titleRef.value) : '';
});
// 层级
const level = computed(() => {
  return isSubmenu.value ? childLevel - 1 : childLevel;
});
// 是否选中
const isSelected = computed(() => {
  if (isSubmenu.value) {
    const target = childKeys.value.find((item) => {
      return item.path == computedSelectedKeys.value && item.type != 'submenu';
    });
    return level.value <= (target?.level ?? -1);
  }
  return computedSelectedKeys.value == path.value;
});
// 处理点击
const handleClick = () => {
  if (computedSelectedKeys.value == path.value || disabled.value) {
    return;
  }
  // submenu点击
  if (isSubmenu.value) {
    const index = computedOpenKeys.value.findIndex(
      (item) => item == path.value
    );
    // 展开元素
    if (index != -1) {
      computedOpenKeys.value = computedOpenKeys.value.filter(
        (item) => item != path.value
      );
      _emits('subMenuClick', path.value, computedOpenKeys.value);
      return;
    }
    // 处理手风琴模式
    if (accordion.value) {
      computedOpenKeys.value = [path.value];
    } else {
      computedOpenKeys.value.push(path.value);
    }
    _emits('subMenuClick', path.value, computedOpenKeys.value);
  } else {
    computedSelectedKeys.value = path.value;
    _emits('menuItemClick', path.value);
  }
};
// 收集
const collectKeys = () => {
  if (isSubmenu.value && autoOpen.value) {
    computedOpenKeys.value.push(path.value);
  }
  const index = childKeys.value.findIndex((item) => item.path == path.value);
  if (index == -1) {
    childKeys.value.push({
      label: title.value,
      type: isSubmenu.value ? 'submenu' : 'menuitem',
      level: childLevel - 1,
      path: path.value,
    });
  }
};
onMounted(() => {
  collectKeys();
});
</script>

<style lang="less" scoped>
@import './style/menu-item.less';
</style>
