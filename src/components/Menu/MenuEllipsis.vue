<template>
  <div
    :class="{
      'yc-menu-item-wrapper': true,

      'yc-menu-item-mode-horizontal': mode == 'horizontal',
    }"
  >
    <yc-dropdown
      :popup-max-height="maxHeight"
      :trigger-props="{
        position: 'bl',
        ...triggerProps,
      }"
      ref="dropdownRef"
      @select="handleSelect"
    >
      <div
        :class="[
          'yc-menu-item',
          'yc-menu-item-ellipsis',
          `yc-menu-item-theme-${theme}`
          isSelected ? 'yc-menu-item-selected' : '',
        ]"
      >
        <div class="yc-menu-item-title">
          <icon-more />
        </div>
        <div class="yc-menu-icon-suffix">
          <icon-arrow-down />
        </div>
      </div>
      <template #content>
        <menu-pop-option
          v-for="item in menuItemData.slice(max)"
          :key="item.childTree[0].path"
          :child-node="item.childTree[0]"
          :mode="mode"
          :computed-selected-keys="computedSelectedKeys"
          :popup-max-height="maxHeight"
          :trigger-props="triggerProps"
        >
          {{ item.childTree[0].label }}
        </menu-pop-option>
      </template>
    </yc-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { IconMore, IconArrowDown } from '@shared/icons';
import { isNumber } from '@shared/utils';
import useProvide from './hooks/useProvide';
import { flattenMenuTree } from './hooks/useMenuLevel';
import MenuPopOption from './MenuPopOption.vue';
import {
  default as YcDropdown,
  DropdownInstance,
  DoptionValue,
} from '@/components/Dropdown';
// 接收menu注入
const { inject } = useProvide();
const {
  computedSelectedKeys,
  mode,
  theme,
  triggerProps,
  popupMaxHeight,
  max,
  menuItemData,
  emits,
} = inject();
// popup可见性
const dropdownRef = ref<DropdownInstance>();
// 计算最大height
const maxHeight = computed(() => {
  return popupMaxHeight.value && isNumber(popupMaxHeight.value)
    ? popupMaxHeight.value
    : 167;
});
// 扁平化的数据
const flattenData = computed(() => {
  return flattenMenuTree(
    menuItemData.value.map((item) => item.childTree).flat(1)
  );
});
// 是否选中
const isSelected = computed(() =>
  flattenData.value.find((item) => item.path == computedSelectedKeys.value)
);
// 处理选择
const handleSelect = (value: DoptionValue) => {
  if (computedSelectedKeys.value == value) return;
  computedSelectedKeys.value = value as string;
  emits('menuItemClick', value as string);
};
</script>

<style lang="less" scoped>
@import './style/menu-item.less';
</style>
