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
          isSelected ? 'yc-menu-item-selected' : '',
          MENU_ITEM_THEME_MAP[theme],
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
import { ref, toRefs, computed } from 'vue';
import { MenuItemData } from './hooks/useProvide';
import { ChlidTreeNode } from './hooks/useMenuLevel';
import { MenuMode, PopupMaxHeight } from './type';
import { TriggerProps } from '@/components/Trigger';
import { IconMore, IconArrowDown } from '@shared/icons';
import { isNumber } from '@shared/utils';
import { MENU_ITEM_THEME_MAP } from '@shared/constants';
import MenuPopOption from './MenuPopOption.vue';
import {
  default as YcDropdown,
  DropdownInstance,
  DoptionValue,
} from '@/components/Dropdown';
const props = defineProps<{
  menuItemData: MenuItemData[];
  max: number;
  computedSelectedKeys: string;
  mode: MenuMode;
  theme: 'light' | 'dark';
  triggerProps: TriggerProps;
  popupMaxHeight: PopupMaxHeight;
  flattenData: ChlidTreeNode[];
}>();
const emits = defineEmits<{
  (e: 'select', value: string): void;
}>();
const { popupMaxHeight, computedSelectedKeys, flattenData } = toRefs(props);
// popup可见性
const dropdownRef = ref<DropdownInstance>();
// 计算最大height
const maxHeight = computed(() => {
  return popupMaxHeight.value && isNumber(popupMaxHeight.value)
    ? popupMaxHeight.value
    : 167;
});
// 是否选中
const isSelected = computed(() =>
  flattenData.value.find((item) => item.path == computedSelectedKeys.value)
);
const handleSelect = (value: DoptionValue) => {
  if (computedSelectedKeys.value != value) {
    emits('select', value as string);
  }
};
</script>

<style lang="less" scoped>
@import './style/menu-item.less';
</style>
