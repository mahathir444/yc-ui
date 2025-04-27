<template>
  <div class="yc-menu-item-wrapper" ref="menuItemRef">
    <define-template>
      <div
        :class="{
          'yc-menu-item': true,
          'yc-menu-item-selected': isSelected,
          'yc-menu-item-disabled': disabled,
        }"
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
          class="yc-menu-item-title text-ellipsis"
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
      v-if="
        isSubmenu && !curLevel && (mode != 'vertical' || !computedCollapsed)
      "
      :position="mode == 'horizontal' ? 'bl' : 'rt'"
      :trigger-props="{
        autoFitPopupMinWidth: true,
        ...triggerProps,
      }"
      :autoFitPosition="false"
      :content-style="{
        padding: '4px 0',
      }"
      ref="popoverRef"
    >
      <reuse-template />
      <template #content>
        <yc-scrollbar
          :style="{
            maxHeight: maxHeight + 'px',
          }"
        >
          <pop-option
            v-for="item in childTree"
            :key="item.path"
            :child-node="item"
            :mode="mode"
            :computed-selected-keys="computedSelectedKeys"
            :trigger-props="triggerProps"
            :popup-max-height="maxHeight"
          >
            {{ item.label }}
          </pop-option>
        </yc-scrollbar>
      </template>
    </yc-popover>
    <!-- 选然tooltip -->
    <yc-tooltip
      v-else-if="!isSubmenu && curLevel && computedCollapsed"
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
import { ref, toRefs, computed, onMounted, provide } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import { MenuItemProps } from './type';
import { getTextContent, isNumber } from '@shared/utils';
import { IconMore } from '@shared/icons';
import { DROPDOWN_PROVIDE_KEY } from '@shared/constants';
import useProvide from './hooks/useProvide';
import useMenuLevel from './hooks/useMenuLevel';
import PopOption from './component/PopOption.vue';
import { DropdownProvide } from '@/components/Dropdown';
import YcPopover, { PopoverInstance } from '@/components/Popover';
import YcTooltip from '@/components/Tooltip';
import YcScrollbar from '@/components/Scrollbar';

defineOptions({
  name: 'MenuItem',
});
const props = withDefaults(defineProps<MenuItemProps>(), {
  path: '',
  disabled: false,
  isSubmenu: false,
});
const { path, disabled, isSubmenu } = toRefs(props);
// 创建通用模板
const { reuse: ReuseTemplate, define: DefineTemplate } =
  createReusableTemplate();
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
  order,
  max,
  menuItemData,
  popupMaxHeight: _popupMaxHeight,
  emits: _emits,
} = inject();
// popup可见性
const popoverRef = ref<PopoverInstance>();
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
provide<DropdownProvide>(DROPDOWN_PROVIDE_KEY, {
  select: (value) => {
    if (computedSelectedKeys.value != (value as string)) {
      computedSelectedKeys.value = value as string;
      _emits('menuItemClick', value as string);
    }
    popoverRef.value?.hide();
  },
});
// 处理点击
const handleClick = () => {
  if (
    (mode.value != 'vertical' && isSubmenu.value) ||
    computedCollapsed.value ||
    computedSelectedKeys.value == path.value ||
    disabled.value
  ) {
    return;
  }
  // submenu点击
  if (isSubmenu.value) {
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
  if (!isSubmenu.value) return;
  if (autoOpen.value || (isSelected.value && autoOpenSelected.value)) {
    computedSelectedKeys.value = path.value;
  }
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
