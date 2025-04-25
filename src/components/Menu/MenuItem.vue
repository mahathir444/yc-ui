<template>
  <div class="yc-menu-item-wrapper" @click="handleClick">
    <define-template>
      <div
        :class="[
          'yc-menu-item',
          isSelected ? 'yc-menu-item-selected' : '',
          disabled ? 'yc-menu-item-disabled' : '',
        ]"
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
    </define-template>
    <!-- 选然popover -->
    <yc-popover
      v-if="isSubmenu && !level && (mode == 'pop' || computedCollapsed)"
      v-model:popup-visible="popupVisible"
      position="rt"
      :autoFitPosition="false"
      :content-style="{
        padding: '4px 0',
      }"
      v-bind="triggerProps"
    >
      <reuse-template />
      <template #content>
        <pop-option
          v-for="item in childTree"
          :key="item.path"
          :child-node="item"
        >
          {{ item.label }}
        </pop-option>
      </template>
    </yc-popover>
    <!-- 选然tooltip -->
    <yc-tooltip
      v-else-if="computedCollapsed && level && !isSubmenu"
      position="rt"
      :autoFitPosition="false"
      :content="title"
      v-bind="tooltipProps"
    >
      <reuse-template />
    </yc-tooltip>
    <!-- 选然template -->
    <reuse-template v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, inject, computed, onMounted, provide } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import { MenuItemProps, MenuProvide, SubMenuProvide } from './type';
import {
  SUBMENU_PROVIDE_KEY,
  MENU_PROVIDE_KEY,
  DROPDOWN_PROVIDE_KEY,
} from '@shared/constants';
import { getTextContent, buildMenuTree } from '@shared/utils';
import YcPopover from '@/components/Popover';
import YcTooltip from '@/components/Tooltip';
import { DropdownProvide } from '@/components/Dropdown';
import PopOption from './component/PopOption.vue';

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
  triggerProps,
  tooltipProps,
  autoOpenSelected,
  mode,
  emits: _emits,
} = inject<MenuProvide>(MENU_PROVIDE_KEY, {
  computedSelectedKeys: ref(''),
  computedOpenKeys: ref([]),
  levelIndent: ref(20),
  computedCollapsed: ref(false),
  accordion: ref(false),
  autoOpen: ref(false),
  triggerProps: ref({}),
  tooltipProps: ref({}),
  autoOpenSelected: ref(false),
  mode: ref('vertical'),
  emits: () => {},
});
const { reuse: ReuseTemplate, define: DefineTemplate } =
  createReusableTemplate();
// 接收submenu注入
const { childKeys, childLevel } = inject<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
  childKeys: ref([]),
  level: ref(1),
  childLevel: 0,
});
// 层级
const level = computed(() => {
  return isSubmenu.value ? childLevel - 1 : childLevel;
});
// 子菜单转树
const childTree = computed(() => buildMenuTree(childKeys.value));
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
// title容器
const titleRef = ref<HTMLDivElement>();
// title
const title = computed(() => {
  return titleRef.value ? getTextContent(titleRef.value) : '';
});
const popupVisible = ref<boolean>(false);
// 注入Popover
provide<DropdownProvide>(DROPDOWN_PROVIDE_KEY, {
  select: (value) => {
    if (computedSelectedKeys.value != (value as string)) {
      computedSelectedKeys.value = value as string;
      _emits('menuItemClick', value as string);
    }
    console.log(computedSelectedKeys.value, 'value');
    popupVisible.value = false;
  },
});
// 处理点击
const handleClick = () => {
  if (computedCollapsed.value && mode.value != 'pop') return;
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
  console.log('事件触发了');
};
// 收集
const collectKeys = () => {
  if (isSubmenu.value) {
    if (autoOpen.value) {
      computedOpenKeys.value.push(path.value);
    }
    if (isSelected.value && autoOpenSelected.value) {
      computedOpenKeys.value.push(path.value);
    }
    return;
  }
  const index = childKeys.value.findIndex((item) => item.path == path.value);
  if (index == -1) {
    childKeys.value.push({
      label: title.value,
      type: 'menuitem',
      level: childLevel - 1,
      path: path.value,
    });
  }
};
onMounted(() => {
  collectKeys();
});

defineExpose({
  getTitle() {
    return title.value;
  },
});
</script>

<style lang="less" scoped>
@import './style/menu-item.less';
</style>
