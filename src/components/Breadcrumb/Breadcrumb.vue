<template>
  <div class="yc-breadcrumb">
    <slot v-if="!routes.length" />
    <!-- routes渲染 -->
    <template v-for="(route, index) in routes" :key="route.path">
      <slot
        name="item-render"
        :route="route"
        :routes="routes"
        :paths="getPaths(index)"
      >
        <yc-breadcrumb-item
          :path="
            index == routes.length - 1
              ? route.path
              : (customUrl?.(getPaths(index)) ?? route.path)
          "
          :droplist="route.children"
        >
          {{ route.label }}
          <template v-if="$slots.separator" #separator>
            <slot name="separator" />
          </template>
          <template v-if="$slots['more-icon']" #more-icon>
            <slot name="more-icon" />
          </template>
        </yc-breadcrumb-item>
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { BreadcrumbProps } from './type';
import useProvide from './hooks/useProvide';
import { BreadcrumbItem as YcBreadcrumbItem } from './index';
defineOptions({
  name: 'Breadcrumb',
});
const props = withDefaults(defineProps<BreadcrumbProps>(), {
  maxCount: 0,
  routes: () => [],
  separator: '',
  customUrl: undefined,
});
const { routes } = toRefs(props);
// 注入数据
const { provide } = useProvide();
provide(props);
// 获取path
const getPaths = (index: number) => {
  return routes.value
    .slice(0, index + 1)
    .map((item) => item.path?.replace(/\//g, '')) as string[];
};
</script>

<style lang="less" scoped>
@import './style/breadcrumb.less';
</style>
