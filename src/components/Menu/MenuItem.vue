<template>
  <div
    :class="{
      'yc-menu-item-wrapper': true,
      'yc-menu-item-mode-horizontal': mode == 'horizontal',
    }"
    ref="menuItemRef"
  >
    <define-template>
      <div
        :class="[
          'yc-menu-item',
          isSelected ? 'yc-menu-item-selected' : '',
          disabled ? 'yc-menu-item-disabled' : '',
          computedCollapsed ? 'yc-menu-item-collapsed' : '',
          MENU_ITEM_THEME_MAP[theme],
        ]"
        @click="handleClick"
      >
        <div
          v-if="curLevel"
          class="yc-menu-indent"
          :style="{
            width: `${levelIndent * curLevel}px`,
            height: `${levelIndent}px`,
          }"
        ></div>
        <div v-if="$slots.icon" class="yc-menu-icon">
          <slot name="icon" />
        </div>
        <!-- content -->
        <div
          v-show="!computedCollapsed"
          :class="{
            'yc-menu-item-title': true,
            'text-ellipsis': mode != 'horizontal',
          }"
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
    <!-- dropdown选择 -->
    <yc-dropdown
      v-if="isSubmenu && !curLevel && (mode != 'vertical' || computedCollapsed)"
      :popup-max-height="maxHeight"
      :trigger-props="{
        autoFitPosition: false,
        autoFitPopupMinWidth: true,
        needTransformOrigin: true,
        position: mode == 'horizontal' ? 'bl' : 'rt',
        animationName: 'zoom-in-fade-out',
        ...triggerProps,
      }"
      ref="dropdownRef"
      @select="handleSelect"
    >
      <reuse-template />

      <template #content>
        <pop-option
          v-for="item in childTree"
          :key="item.path"
          :child-node="item"
          :mode="mode"
          :computed-selected-keys="computedSelectedKeys"
          :popup-max-height="maxHeight"
          :trigger-props="triggerProps"
        >
          {{ item.label }}
        </pop-option>
      </template>
    </yc-dropdown>
    <!-- 选然tooltip -->
    <yc-tooltip
      v-else-if="!isSubmenu && curLevel && computedCollapsed"
      position="rt"
      :content="title"
      :trigger-props="{
        autoFitPosition: false,
        ...triggerProps,
      }"
      v-bind="tooltipProps"
    >
      <reuse-template />
    </yc-tooltip>
    <!-- 选然template -->
    <reuse-template v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, onMounted } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import { MenuItemProps } from './type';
import { getTextContent, isNumber } from '@shared/utils';
import { MENU_ITEM_THEME_MAP } from '@shared/constants';
import useProvide from './hooks/useProvide';
import useMenuLevel from './hooks/useMenuLevel';
import PopOption from './MenuPopOption.vue';
import { default as YcDropdown, DropdownInstance } from '@/components/Dropdown';
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
const { inject } = useProvide();
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
  theme,
  order,
  autoScrollIntoView,
  scrollConfig,
  popupMaxHeight: _popupMaxHeight,
  max,
  menuItemData,
  emits: _emits,
} = inject();
// 创建通用模板
const { reuse: ReuseTemplate, define: DefineTemplate } =
  createReusableTemplate();
// popup可见性
const dropdownRef = ref<DropdownInstance>();
// title容器
const menuItemRef = ref<HTMLDivElement>();
// title
const title = computed(() => {
  return menuItemRef.value ? getTextContent(menuItemRef.value) : '';
});
// maxHeight
const maxHeight = computed(() => {
  if (popupMaxHeight.value && isNumber(popupMaxHeight.value)) {
    return popupMaxHeight.value;
  } else if (_popupMaxHeight.value && isNumber(_popupMaxHeight.value)) {
    return _popupMaxHeight.value;
  }
  return 167;
});
// 接收submenu注入
const {
  isSelected,
  curLevel,
  curOrder,
  childTree,
  popupMaxHeight,
  collectKeys,
} = useMenuLevel({
  path,
  isSubmenu,
  order,
  menuItemRef,
  menuItemData,
  mode: 'menuitem',
  computedSelectedKeys,
});
// 注入Popover
const handleSelect = (value: any) => {
  if (computedSelectedKeys.value != (value as string)) {
    computedSelectedKeys.value = value as string;
    _emits('menuItemClick', value as string);
  }
  dropdownRef.value?.hide();
};
// 自动滚动
const autoScroll = () => {
  // 配置自动滚动
  if (autoScrollIntoView.value && computedSelectedKeys.value == path.value) {
    menuItemRef.value?.scrollIntoView(scrollConfig.value);
  }
};
// 处理点击
const handleClick = () => {
  if (
    (mode.value != 'vertical' && isSubmenu.value) ||
    computedCollapsed.value
  ) {
    return;
  }
  // submenu点击
  if (
    !isSubmenu.value &&
    computedSelectedKeys.value != path.value &&
    !disabled.value
  ) {
    computedSelectedKeys.value = path.value;
    return _emits('menuItemClick', path.value);
  }
  // 展开元素
  if (computedOpenKeys.value.includes(path.value)) {
    computedOpenKeys.value = computedOpenKeys.value.filter(
      (item) => item != path.value
    );
  } else {
    computedOpenKeys.value = accordion.value
      ? [path.value]
      : [...computedOpenKeys.value, path.value];
  }
  _emits('subMenuClick', path.value, computedOpenKeys.value);
};
// 收集
onMounted(() => {
  collectKeys(title.value);
  autoScroll();
  if (
    !isSubmenu.value ||
    !autoOpen.value ||
    !autoOpenSelected.value ||
    !isSelected.value
  ) {
    return;
  }
  computedOpenKeys.value.push(path.value);
});
// 暴露方法
defineExpose({
  getTitle() {
    return title.value;
  },
});
</script>

<style lang="less" scoped>
@import './style/menu-item.less';
</style>
