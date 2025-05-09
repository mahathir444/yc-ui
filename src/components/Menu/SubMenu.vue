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
          !computedCollapsed &&
          computedOpenKeys.includes(path)
        "
        class="yc-menu-inline-content"
      >
        <slot />
      </div>
    </expand-transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted } from 'vue';
import { SubMenuProps, SubMenuSlots } from './type';
import { IconArrowDown, IconArrowRight } from '@shared/icons';
import { ExpandTransition } from '@shared/components';
import { MenuItem as YcMenuItem, MenuItemInstance } from './index';
import useMenuLevel from './hooks/useMenuLevel';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'SubMenu',
});
defineSlots<SubMenuSlots>();
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
const { inject } = useProvide();
const {
  mode,
  computedOpenKeys,
  computedCollapsed,
  computedSelectedKeys,
  popupMaxHeight: _popupMaxHeight,
} = inject();
// 注入属性
const { provideKeys, collectKeys } = useMenuLevel({
  path,
  isSubmenu: ref(false),
  mode: 'submenu',
  computedSelectedKeys,
  menuItemRef: ref<HTMLDivElement | undefined>(),
  menuItemData: ref([]),
  index: ref(0),
});
provideKeys();

onMounted(() => {
  collectKeys(title.value ? title.value : headerRef.value!.getTitle());
});
</script>

<style lang="less" scoped>
@import './style/sub-menu.less';
</style>
