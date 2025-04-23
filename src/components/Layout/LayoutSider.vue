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
import { ref, onMounted, inject, toRefs } from 'vue';
import { LayoutSiderProps, LayoutProvide } from './type';
import { useControlValue } from '@shared/hooks';
import { mediaQueryHandler } from '@shared/utils';
import { LAYOUT_PROVIDE_KEY } from '@shared/constants';
import { YcIconButton } from '@shared/components';
import { IconArrowRight } from '@shared/icons';
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
const emits = defineEmits<{
  (e: 'update:collapsed', collapsed: boolean): void;
  (
    e: 'collapse',
    collapsed: boolean,
    type: 'clickTrigger' | 'responsive'
  ): void;
  (e: 'breakpoint', collapsed: boolean): void;
}>();
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
// 受控的收缩
const computedCollapsed = useControlValue<boolean>(
  collapsed,
  defaultCollapsed.value,
  (val) => {
    emits('update:collapsed', val);
  }
);
// 注入数据
const { curLevel, hasSider } = inject<LayoutProvide>(LAYOUT_PROVIDE_KEY, {
  curLevel: ref(0),
  hasSider: ref(false),
});
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
// 处理层级关系
onMounted(() => {
  if (hasSider.value) return;
  hasSider.value = true;
  curLevel.value++;
});
</script>

<style lang="less" scoped>
@import './style/layout.less';
</style>
