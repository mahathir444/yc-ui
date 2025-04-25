<template>
  <div class="yc-menu-inline">
    <yc-menu-item is-submenu :path="path" class="yc-menu-inline-header">
      <slot name="title">
        {{ title }}
      </slot>
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <template #suffix>
        <slot v-if="!computedOpenKeys.includes(path)" name="expand-icon-down">
          <icon-arrow-down />
        </slot>
        <slot v-else name="expand-icon-up">
          <icon-arrow-up />
        </slot>
      </template>
    </yc-menu-item>
    <!-- 过渡 -->
    <expand-transition>
      <div
        v-show="computedOpenKeys.includes(path) && !computedCollapsed"
        class="yc-menu-inline-content"
      >
        <slot />
      </div>
    </expand-transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, provide, toRefs } from 'vue';
import { SubMenuProps, MenuProvide, SubMenuProvide } from './type';
import { IconArrowDown, IconArrowUp } from '@shared/icons';
import { SUBMENU_PROVIDE_KEY, MENU_PROVIDE_KEY } from '@shared/constants';
import { ExpandTransition } from '@shared/components';
import YcMenuItem from './MenuItem.vue';
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
const { path } = toRefs(props);
// 接收
const { childKeys, level } = inject<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
  childKeys: ref([]),
  level: ref<number>(1),
  childLevel: 0,
});
console.log(childKeys.value);

// 继续注入
provide<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
  childKeys,
  level,
  childLevel: level.value++,
});
// 接收父级注入的属性
const { computedOpenKeys, computedCollapsed } = inject<MenuProvide>(
  MENU_PROVIDE_KEY,
  {
    computedSelectedKeys: ref(''),
    computedOpenKeys: ref([]),
    levelIndent: ref(20),
    computedCollapsed: ref(false),
    accordion: ref(false),
    autoOpen: ref(false),
    emits: () => {},
  }
);
</script>

<style lang="less" scoped>
@import './style/sub-menu.less';
</style>
