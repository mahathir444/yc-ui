<template>
  <div class="yc-menu-inline">
    <yc-menu-item
      is-submenu
      :path="path"
      :popupMaxHeight="popupMaxHeight"
      class="yc-menu-inline-header"
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
import { toRefs } from 'vue';
import { SubMenuProps, SubMenuSlots } from './type';
import useContext from './hooks/useContext';
import { IconArrowDown, IconArrowRight } from '@shared/icons';
import { ExpandTransition } from '@shared/components';
import { MenuItem as YcMenuItem } from './index';
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
// 接收父级注入的属性
const { inject } = useContext();
const { mode, computedOpenKeys, computedCollapsed } = inject();
</script>

<style lang="less" scoped>
@import './style/sub-menu.less';
</style>
