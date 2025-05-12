<template>
  <div
    v-if="!maxCount || curIndex <= 1 || curIndex - maxCount > 0"
    class="yc-breadcrumb-item-wrapper"
  >
    <yc-dropdown
      v-model:popup-visible="popupVisible"
      v-bind="dropdownProps"
      :disabled="!droplist.length"
    >
      <div class="yc-breadcrumb-item">
        <!-- 第二个breaditem用于显示图标 -->
        <template v-if="maxCount && curIndex == 1">
          <slot name="more-icon">
            <icon-more />
          </slot>
        </template>
        <a v-else-if="path" :href="`#${path}`">
          <slot />
        </a>
        <slot v-else />
        <!-- 显示dropdowncion -->
        <div v-if="droplist.length" class="yc-breadcrumb-item-dropdown-icon">
          <icon-arrow-down v-if="!popupVisible" />
          <IconArrowUp v-else />
        </div>
      </div>
      <template #content>
        <slot name="droplist">
          <yc-doption
            v-for="item in droplist"
            :key="item.path"
            :value="item.path"
          >
            {{ item.label }}
          </yc-doption>
        </slot>
      </template>
    </yc-dropdown>
    <!-- 分隔符 -->
    <span v-if="curIndex != index" class="yc-breadcrumb-item-separator">
      <slot name="separator">
        <template v-if="computedSeparator">
          {{ computedSeparator }}
        </template>
        <icon-separator v-else />
      </slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { BreadcrumbItemProps, BreadcrumbItemSlots } from './type';
import useProvide from './hooks/useProvide';
import {
  IconArrowDown,
  IconArrowUp,
  IconMore,
  IconSeparator,
} from '@shared/icons';
import {
  default as YcDropdown,
  Doption as YcDoption,
} from '@/components/Dropdown';
defineOptions({
  name: 'BreadcrumbItem',
});
defineSlots<BreadcrumbItemSlots>();
const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
  separator: '',
  droplist: () => [],
  dropdownProps: () => {
    return {};
  },
  path: '',
});
const { separator } = toRefs(props);
// 接收数据
const { inject } = useProvide();
const { index, maxCount, separator: _separator } = inject();
// popupVisible
const popupVisible = ref<boolean>(false);
// 当前的Index
const curIndex = ref<number>(++index.value);
// 当前的separator
const computedSeparator = computed(() => {
  return separator.value ? separator.value : _separator.value;
});
</script>

<style lang="less" scoped>
@import './style/breadcrumb-item.less';
</style>
