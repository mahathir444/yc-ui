<template>
  <!-- 伸缩杆 -->
  <yc-resize-box
    v-if="resizeDirections.length"
    v-model:width="width"
    :class="['yc-layout-sider', `yc-layout-sider-${theme}`]"
  >
    <slot />
    <slot v-if="!hideTrigger" name="trigger" :collapsed="computedCollapsed">
      <icon-button
        :hover-size="24"
        class="yc-collapse-button"
        @click="handleCollapse"
      >
        <icon-arrow-right
          :rotate="computedCollapsed && !reverseArrow ? 0 : 180"
        />
      </icon-button>
    </slot>
  </yc-resize-box>
  <!-- 默认元素 -->
  <aside
    v-else
    :class="[
      'yc-layout-sider',
      'yc-layout-sider-translation',
      `yc-layout-sider-${theme}`,
      {
        'yc-layout-sider-collapsed': computedCollapsed,
      },
    ]"
  >
    <slot />
    <slot v-if="!hideTrigger" name="trigger" :collapsed="computedCollapsed">
      <icon-button
        :size="14"
        :hover-size="24"
        class="yc-collapse-button"
        @click="handleCollapse"
      >
        <icon-arrow-right
          :rotate="computedCollapsed && !reverseArrow ? 0 : 180"
        />
      </icon-button>
    </slot>
  </aside>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { LayoutSiderProps, LayoutSiderEmits, LayoutSiderSlots } from './type';
import { useControlValue, mediaQueryHandler, valueToPx } from '@shared/utils';
import { IconArrowRight } from '@shared/icons';
import { IconButton } from '@shared/components';
import YcResizeBox from '@/components/ResizeBox';
defineOptions({
  name: 'LayoutSider',
});
defineSlots<LayoutSiderSlots>();
const props = withDefaults(defineProps<LayoutSiderProps>(), {
  theme: 'light',
  collapsed: undefined,
  defaultCollapsed: false,
  collapsible: false,
  width: 200,
  collapsedWidth: 48,
  reverseArrow: false,
  breakpoint: undefined,
  hideTrigger: true,
  resizeDirections: () => {
    return [];
  },
});
const emits = defineEmits<LayoutSiderEmits>();
const {
  collapsed,
  defaultCollapsed,
  collapsible,
  breakpoint,
  width: _width,
  collapsedWidth,
} = toRefs(props);
// 宽度
const width = useControlValue<number>(ref(), _width.value);
// 计算width
const computedWidth = computed(() => valueToPx(width.value));
// 受控的收缩
const computedCollapsed = useControlValue<boolean>(
  collapsed,
  defaultCollapsed.value,
  (val) => {
    emits('update:collapsed', val);
  }
);
// 处理点击收缩
const handleCollapse = () => {
  if (!collapsible.value) return;
  computedCollapsed.value = !computedCollapsed.value;
  width.value = computedCollapsed.value ? collapsedWidth.value : _width.value;
  emits('collapse', computedCollapsed.value, 'clickTrigger');
};
// 处理媒体查询搜索
mediaQueryHandler((_, order, i) => {
  if (!collapsible.value || !breakpoint.value) return;
  computedCollapsed.value = i <= order[breakpoint.value];
  width.value = computedCollapsed.value ? collapsedWidth.value : _width.value;
  emits('collapse', computedCollapsed.value, 'responsive');
  emits('breakpoint', computedCollapsed.value);
});
</script>

<style lang="less" scoped>
@import './style/layout.less';
.yc-layout-sider-collapsed {
  width: v-bind(computedWidth) !important;
}
</style>
