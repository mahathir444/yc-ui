<template>
  <section
    :class="{
      'yc-layout': true,
      'yc-layout-has-sider': computedHasSider,
    }"
  >
    <slot />
  </section>
</template>

<script lang="ts" setup>
import { ref, provide, toRefs, computed } from 'vue';
import { LayoutProps } from './type';
import { isUndefined } from '@shared/utils';
defineOptions({
  name: 'Layout',
});
const props = withDefaults(defineProps<LayoutProps>(), {
  hasSider: undefined,
});
const { hasSider: _hasSider } = toRefs(props);
// 是否有sider
const hasSider = ref<boolean>(false);
// 当前的level
const curLevel = ref<number>(0);
// 是否有sider
const computedHasSider = computed(() => {
  if (!isUndefined(_hasSider.value)) return _hasSider.value;
  return curLevel.value == 1 && hasSider.value;
});
provide('layout-props', {
  hasSider,
  curLevel,
});
</script>

<style lang="less" scoped>
@import './style/layout.less';
</style>
