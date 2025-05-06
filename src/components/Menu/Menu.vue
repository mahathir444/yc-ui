<template>
  <div
    :class="['yc-menu', MENU_DIRECTION_MAP[mode], MENU_THEME_MAP[theme]]"
    :style="{
      width: computedCollapsed ? collapsedWidth + 'px' : '',
    }"
  >
    <div class="yc-menu-inner" ref="menuRef">
      <slot />
      <!-- <yc-dropdown
        v-if="max <= menuItemData.length"
        :popup-max-height="167"
        :trigger-props="{
          autoFitPosition: false,
          autoFitPopupMinWidth: true,
          needTransformOrigin: true,
          position: mode == 'horizontal' ? 'bl' : 'rt',
          animationName: 'zoom-in-fade-out',
          ...triggerProps,
        }"
        ref="dropdownRef"
      >
        <div class="yc-menu-item">
          <icon-more />
        </div>
        <template #content>
          <menu-pop-option
            v-for="item in menuItemData"
            :key="item.childTree[0].path"
            :child-node="item.childTree[0]"
            :mode="mode"
            :computed-selected-keys="computedSelectedKeys"
            :popup-max-height="167"
            :trigger-props="triggerProps"
          >
            {{ item.childTree[0].label }}
          </menu-pop-option>
        </template>
      </yc-dropdown> -->
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
import { ref, computed } from 'vue';
import { MenuProps, MenuEmits } from './type';
import { MENU_DIRECTION_MAP, MENU_THEME_MAP } from '@shared/constants';
import { mediaQueryHandler } from '@shared/utils';
import { IconMenuFold, IconMenuUnfold, IconMore } from '@shared/icons';
import MenuPopOption from './MenuPopOption.vue';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'Menu',
});
const props = withDefaults(defineProps<MenuProps>(), {
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
// menuredf
const menuRef = ref<HTMLDivElement>();
// 注入数据
const { provide } = useProvide();
const {
  computedCollapsed,
  computedSelectedKeys,
  collapsedWidth,
  breakpoint,
  max,
  menuItemData,
} = provide(props, emits, menuRef);
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
@import './style//menu-item.less';
</style>
