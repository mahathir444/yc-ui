<template>
  <div class="yc-breadcrumb">
    <!-- 渲染默认插槽 -->
    <template v-for="(node, i) in breadcrumbItems" :key="i">
      <breadcrumb-more v-if="node == 'more-icon'" :slots="slots" />
      <component v-else :is="node" />
      <!-- 分隔符 -->
      <breadcrumb-separator
        v-if="i < breadcrumbItems.length - 1"
        :separator="separator"
        :separator-slots="$slots.separator"
        :item-separator="(node as ObjectData)?.props?.separator"
        :item-separator-slots="(node as ObjectData)?.children?.separator"
      />
    </template>
    <!-- routes渲染 -->
    <template v-for="(route, index) in routes" :key="route.path">
      <slot
        name="item-render"
        :route="route"
        :routes="routes"
        :paths="getPaths(index)"
      >
        <!-- more-icon -->
        <breadcrumb-more v-if="route == 'more-icon'" :slots="slots" />
        <!-- item -->
        <yc-breadcrumb-item
          v-else
          :path="
            index == routes.length - 1
              ? route.path
              : (customUrl?.(getPaths(index)) ?? route.path)
          "
          :droplist="route.children"
        >
          {{ route.label }}
        </yc-breadcrumb-item>
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, useSlots } from 'vue';
import { BreadcrumbProps, BreadcrumbSlots } from './type';
import { findComponentsFromVnodes } from '@shared/utils';
import { ObjectData } from '@shared/type';
import { BreadcrumbItem as YcBreadcrumbItem } from './index';
import BreadcrumbSeparator from './BreadcrumbSeparator.vue';
import BreadcrumbMore from './BreadcrumbMore.vue';
defineOptions({
  name: 'Breadcrumb',
});
defineSlots<BreadcrumbSlots>();
const props = withDefaults(defineProps<BreadcrumbProps>(), {
  maxCount: 0,
  routes: () => [],
  separator: '',
  customUrl: undefined,
});
const { maxCount, routes: _routes } = toRefs(props);
// 注入数据
const slots = useSlots();
// slot-items
const breadcrumbItems = computed(() => {
  const items = findComponentsFromVnodes(
    slots.default?.() || [],
    YcBreadcrumbItem.name as string
  );
  return maxCount.value > 0 && items.length > maxCount.value
    ? [
        ...items.slice(0, 1),
        'more-icon',
        ...items.slice(items.length - maxCount.value + 1, items.length),
      ]
    : items;
});
// routes
const routes = computed(() => {
  const len = _routes.value.length;
  if (maxCount.value > 0 && len > maxCount.value) {
    return [
      ..._routes.value.slice(0, 1),
      'more-icon',
      ..._routes.value.slice(len - maxCount.value + 1, len),
    ];
  }
  return ['', '', ..._routes.value];
});
// 获取path
const getPaths = (index: number) => {
  return _routes.value
    .slice(0, index + 1)
    .map((item) => item.path?.replace(/\//g, '')) as string[];
};
</script>

<style lang="less" scoped>
@import './style/breadcrumb.less';
</style>
