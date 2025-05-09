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
import { toRefs, computed } from 'vue';
import { LayoutProps, LayoutSlots } from './type';
import { isUndefined } from '@shared/utils';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'Layout',
});
defineSlots<LayoutSlots>();
const props = withDefaults(defineProps<LayoutProps>(), {
  hasSider: undefined,
});
const { hasSider: _hasSider } = toRefs(props);
// 注入
const { provide } = useProvide();
const { hasSider, curLevel } = provide();
// 是否有sider
const computedHasSider = computed(() => {
  if (!isUndefined(_hasSider.value)) return _hasSider.value;
  return curLevel.value == 1 && hasSider.value;
});
</script>

<style lang="less" scoped>
@import './style/layout.less';
</style>
