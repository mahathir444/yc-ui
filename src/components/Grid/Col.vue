<template>
  <div
    class="yc-col"
    :style="{
      padding: `0 ${gutter / 2}px 0 ${gutter / 2}px`,
      width: `calc((100% / 24) * ${span})`,
      marginLeft: `calc((100% / 24) * ${offset})`,
      order,
      flex,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, toRefs, onBeforeUnmount, onMounted } from 'vue';
import { ColProps, Flex, ResponsiveValue, GridProvide } from './type';
import { isNumber } from '@shared/utils';
import { GRID_PROVIDE_KEY } from '@shared/constants';
import { MediaQueryManager } from '@shared/utils';
defineOptions({
  name: 'Col',
});
const props = withDefaults(defineProps<ColProps>(), {
  span: 24,
  offset: 0,
});
const {
  span: _span,
  order: _order,
  offset: _offset,
  flex: _flex,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
} = toRefs(props);
// span
const span = ref<number>(_span.value);
const order = ref<number | undefined>(_order.value);
const offset = ref<number>(_offset.value);
const flex = ref<Flex | undefined>(_flex.value);
const { gutter } = inject<GridProvide>(GRID_PROVIDE_KEY, {
  gutter: ref(0),
});
// 媒体查询管理器
const mqm = new MediaQueryManager(
  {
    xs: '(max-width: 0)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
  },
  { debounceTime: 60 }
);
// 获取属性
const getAttr = (value: ResponsiveValue | undefined, attr: string) => {
  return ((value as any)?.[attr] ?? value) as number;
};
onMounted(() => {
  mqm.addHandler((name) => {
    // map
    const mqMap: Record<string, any> = {
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
    };
    let responsiveValue = mqMap[name]?.value;
    span.value = isNumber(getAttr(responsiveValue, 'span'))
      ? getAttr(responsiveValue, 'span')
      : span.value;
    flex.value = isNumber(getAttr(responsiveValue, 'flex'))
      ? getAttr(responsiveValue, 'flex')
      : flex.value;
    offset.value = isNumber(getAttr(responsiveValue, 'offset'))
      ? getAttr(responsiveValue, 'offset')
      : offset.value;
    order.value = isNumber(getAttr(responsiveValue, 'order'))
      ? getAttr(responsiveValue, 'order')
      : order.value;
    console.log('breakPoint', name);
  });
});
onBeforeUnmount(() => {
  mqm.destroy();
});
</script>

<style lang="less" scoped>
// .yc-col {
// }
</style>
