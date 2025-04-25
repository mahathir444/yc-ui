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
        v-if="mode != 'pop'"
        v-show="computedOpenKeys.includes(path) && !computedCollapsed"
        class="yc-menu-inline-content"
      >
        <slot />
      </div>
    </expand-transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, provide, toRefs, onMounted, computed } from 'vue';
import { SubMenuProps, MenuProvide, SubMenuProvide } from './type';
import { IconArrowDown, IconArrowRight } from '@shared/icons';
import { SUBMENU_PROVIDE_KEY, MENU_PROVIDE_KEY } from '@shared/constants';
import { ExpandTransition } from '@shared/components';
import { MenuItem as YcMenuItem, MenuItemInstance } from './index';

defineOptions({
  name: 'SubMenu',
});
const props = withDefaults(defineProps<SubMenuProps>(), {
  path: '',
  title: '',
  selectable: false,
  popup: false,
  popupMaxHeight: true,
});
const { path, title } = toRefs(props);
// headerRef
const headerRef = ref<MenuItemInstance>();
// 接收
const { childKeys, level } = inject<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
  childKeys: ref([]),
  level: ref<number>(1),
  childLevel: 0,
});
const submenuLevel = level.value - 1;
// 继续注入
provide<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
  childKeys,
  level,
  childLevel: level.value++,
});
// 接收父级注入的属性
const { computedOpenKeys, computedCollapsed, mode } = inject<MenuProvide>(
  MENU_PROVIDE_KEY,
  {
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
    emits: () => {},
  }
);
// 收集key
const collectKeys = () => {
  const index = childKeys.value.findIndex((item) => item.path == path.value);
  if (index == -1) {
    childKeys.value.push({
      label: title.value ? title.value : headerRef.value!.getTitle(),
      type: 'submenu',
      level: submenuLevel - 1,
      path: path.value,
    });
  }
};

onMounted(() => {
  collectKeys();
});
</script>

<style lang="less" scoped>
@import './style/sub-menu.less';
</style>
