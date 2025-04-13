<template>
  <div class="yc-breadcrumb">
    <slot />
    <!-- routes渲染 -->
    <template v-for="(route, index) in routes" :key="route.path">
      <slot name="item-render" :route="route" :routes="routes">
        <yc-breadcrumb-item
          :path="route.path"
          :droplist="route.children"
          :is-last="index == routes.length - 1"
        >
          {{ route.label }}
        </yc-breadcrumb-item>
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, useSlots, provide } from 'vue';
import { BreadcrumbProps, BreadcrumbProvide } from './type';
import { BREADCRUMB_PROVIDE_KEY } from '@shared/constants';
import { BreadcrumbItem as YcBreadcrumbItem } from './index';
defineOptions({
  name: 'Breadcrumb',
});
const props = withDefaults(defineProps<BreadcrumbProps>(), {
  maxCount: 0,
  routes: () => [],
  separator: '',
  customUrl: (_path: string[]) => {
    return '';
  },
});
const { maxCount, separator } = toRefs(props);
// 插槽
const slots = useSlots();
// 次序
const index = ref<number>(-1);
// 发放数据
provide<BreadcrumbProvide>(BREADCRUMB_PROVIDE_KEY, {
  index,
  maxCount,
  separator,
  slots,
});
</script>

<style lang="less" scoped>
@import './style/breadcrumb.less';
</style>
