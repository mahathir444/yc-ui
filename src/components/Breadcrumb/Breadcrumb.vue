<template>
  <div class="yc-breadcrumb">
    <slot v-if="!routes.length" />
    <!-- routes渲染 -->
    <template v-for="route in routes" :key="route.path">
      <slot name="item-render" :route="route" :routes="routes">
        <yc-breadcrumb-item :path="route.path" :droplist="route.children">
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
import { ref, toRefs, provide } from 'vue';
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
// 次序
const index = ref<number>(-1);
// 发放数据
provide<BreadcrumbProvide>(BREADCRUMB_PROVIDE_KEY, {
  index,
  maxCount,
  separator,
});
</script>

<style lang="less" scoped>
@import './style/breadcrumb.less';
</style>
