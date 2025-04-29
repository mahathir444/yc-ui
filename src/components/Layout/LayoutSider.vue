<template>
  <!-- 伸缩杆 -->
  <yc-resize-box
    v-if="resizeDirections.length"
    v-model:width="width"
    :class="[
      'yc-layout-sider',
      theme == 'light' ? 'yc-layout-sider-light' : 'yc-layout-sider-dark',
    ]"
    :style="{
      minWidth: `${collapsedWidth}px`,
    }"
  >
    <slot />
    <slot v-if="!hideTrigger" name="trigger" :collapsed="computedCollapsed">
      <yc-icon-button
        :hover-size="24"
        class="yc-collapse-button"
        @click="handleCollapse"
      >
        <icon-arrow-right
          :rotate="computedCollapsed && !reverseArrow ? 0 : 180"
        />
      </yc-icon-button>
    </slot>
  </yc-resize-box>

  <!-- 默认元素 -->
  <aside
    v-else
    :class="[
      'yc-layout-sider',
      'yc-layout-sider-translation',
      theme == 'light' ? 'yc-layout-sider-light' : 'yc-layout-sider-dark',
    ]"
    :style="{
      width: `${computedCollapsed ? collapsedWidth : width}px`,
    }"
  >
    <slot />
    <slot v-if="!hideTrigger" name="trigger" :collapsed="computedCollapsed">
      <yc-icon-button
        :size="14"
        :hover-size="24"
        class="yc-collapse-button"
        @click="handleCollapse"
      >
        <icon-arrow-right
          :rotate="computedCollapsed && !reverseArrow ? 0 : 180"
        />
      </yc-icon-button>
    </slot>
  </aside>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRefs } from 'vue';
import { LayoutSiderProps, LayoutSiderEmits } from './type';
import { useControlValue } from '@shared/hooks';
import { mediaQueryHandler } from '@shared/utils';
import { YcIconButton } from '@shared/components';
import { IconArrowRight } from '@shared/icons';
import useProvide from './hooks/useProvide';
import YcResizeBox from '@/components/ResizeBox';
defineOptions({
  name: 'LayoutSider',
});
const props = withDefaults(defineProps<LayoutSiderProps>(), {
  theme: 'light',
  collapsed: undefined,
  defaultCollapsed: false,
  collapsible: false,
  width: 200,
  collapsedWidth: 48,
  reverseArrow: false,
  breakpoint: undefined,
  hideTrigger: false,
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
// 注入数据
const { inject } = useProvide();
inject();
// 宽度
const width = useControlValue<number>(ref(), _width.value);
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
</style>
