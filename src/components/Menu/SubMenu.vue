<template>
  <div class="yc-menu-inline">
    <yc-menu-item
      is-submenu
      :path="path"
      class="yc-menu-inline-header"
      ref="headerRef"
    >
      <slot name="title">
        {{ title }}
      </slot>
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <template #suffix>
        <slot v-if="mode != 'pop'" name="expand-icon-down">
          <icon-arrow-down
            :rotate="computedOpenKeys.includes(path) ? 180 : 0"
          />
        </slot>
        <slot v-else name="expand-icon-right">
          <icon-arrow-right />
        </slot>
      </template>
    </yc-menu-item>
    <!-- 过渡 -->
    <expand-transition>
      <div
        v-show="
          mode == 'vertical' &&
          computedOpenKeys.includes(path) &&
          !computedCollapsed
        "
        class="yc-menu-inline-content"
      >
        <slot />
      </div>
    </expand-transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, toRefs, onMounted } from 'vue';
import { SubMenuProps, MenuProvide } from './type';
import { IconArrowDown, IconArrowRight } from '@shared/icons';
import { MENU_PROVIDE_KEY } from '@shared/constants';
import { ExpandTransition } from '@shared/components';
import { MenuItem as YcMenuItem, MenuItemInstance } from './index';
import useMenvLevel from './hooks/useMenvLevel';
defineOptions({
  name: 'SubMenu',
});
const props = withDefaults(defineProps<SubMenuProps>(), {
  path: '',
  title: '',
  selectable: false,
  popup: false,
  popupMaxHeight: undefined,
});
const { path, title } = toRefs(props);
// headerRef
const headerRef = ref<MenuItemInstance>();
// 接收父级注入的属性
const {
  mode,
  computedOpenKeys,
  computedCollapsed,
  computedSelectedKeys,
  popupMaxHeight: _popupMaxHeight,
} = inject<MenuProvide>(MENU_PROVIDE_KEY, {
  computedSelectedKeys: ref(''),
  computedOpenKeys: ref([]),
  levelIndent: ref(20),
  computedCollapsed: ref(false),
  accordion: ref(false),
  autoOpen: ref(false),
  tooltipProps: ref({}),
  triggerProps: ref({}),
  autoOpenSelected: ref(false),
  mode: ref('vertical'),
  popupMaxHeight: ref(167),
  order: ref(0),
  max: ref(0),
  menuItemData: ref([]),
  emits: () => {},
});
// 注入属性
const { provideKeys, collectKeys } = useMenvLevel({
  path,
  isSubHeader: false,
  mode: 'submenu',
  computedSelectedKeys,
  menuItemRef: ref<HTMLDivElement | undefined>(),
  menuItemData: ref([]),
  order: ref(0),
});

provideKeys();

onMounted(() => {
  collectKeys(headerRef.value!.getTitle());
});
</script>

<style lang="less" scoped>
@import './style/sub-menu.less';
</style>
