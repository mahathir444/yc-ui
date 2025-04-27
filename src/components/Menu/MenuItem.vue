<template>
  <div class="yc-menu-item-wrapper">
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
        <yc-scrollbar
          :style="{
            maxHeight: maxHeight + 'px',
          }"
        >
          <pop-option
            v-for="item in childTree"
            :key="item.path"
            :child-node="item"
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
import { MenuItemProps, MenuProvide } from './type';
import { getTextContent, isNumber } from '@shared/utils';
import { MENU_PROVIDE_KEY, DROPDOWN_PROVIDE_KEY } from '@shared/constants';
import useMenvLevel from './hooks/useMenvLevel';
import YcPopover from '@/components/Popover';
import YcTooltip from '@/components/Tooltip';
import { DropdownProvide } from '@/components/Dropdown';
import YcScrollbar from '@/components/Scrollbar';
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
// 创建通用模板
const { reuse: ReuseTemplate, define: DefineTemplate } =
  createReusableTemplate();
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
  popupMaxHeight: _popupMaxHeight,
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
  popupMaxHeight: ref(167),
  emits: () => {},
});
// 接收submenu注入
const { isSelected, childLevel, childTree, popupMaxHeight, collectKeys } =
  useMenvLevel({
    path,
    isSubHeader: isSubmenu.value,
    mode: 'menuitem',
    computedSelectedKeys,
  });
// popup可见性
const popupVisible = ref<boolean>(false);
// maxHeight
const maxHeight = computed(() => {
  if (popupMaxHeight.value && isNumber(popupMaxHeight.value)) {
    return popupMaxHeight.value;
  } else if (_popupMaxHeight.value && isNumber(_popupMaxHeight.value)) {
    return _popupMaxHeight.value;
  }
  return 167;
});
// 层级
const level = computed(() => {
  return isSubmenu.value ? childLevel - 1 : childLevel;
});
// title容器
const titleRef = ref<HTMLDivElement>();
// title
const title = computed(() => {
  return titleRef.value ? getTextContent(titleRef.value) : '';
});
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
  if (
    (computedCollapsed.value && mode.value != 'pop') ||
    computedSelectedKeys.value == path.value ||
    disabled.value
  ) {
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
onMounted(() => {
  collectKeys(title.value);
  if (!isSubmenu.value) return;
  if (autoOpen.value || (isSelected.value && autoOpenSelected.value)) {
    computedSelectedKeys.value = path.value;
  }
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
