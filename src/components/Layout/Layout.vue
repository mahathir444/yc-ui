<template>
  <section
    :class="{
      'yc-layout': true,
      'yc-layout-has-sider': hasSider,
    }"
  >
    <slot />
  </section>
</template>

<script lang="ts" setup>
import { ref, provide, toRefs, watch } from 'vue';
defineOptions({
  name: 'Layout',
});
const props = withDefaults(
  defineProps<{
    hasSider?: boolean;
  }>(),
  {
    hasSider: false,
  }
);
const { hasSider: _hasSider } = toRefs(props);
// 是否有sider
const hasSider = ref<boolean>(false);
// 当前的level
const curLevel = ref<boolean>(false);
provide('layout-props', {
  hasSider,
  curLevel,
});

watch(hasSider, () => {
  console.log(curLevel, hasSider);
});
</script>

<style lang="less" scoped>
@import './style/layout.less';
</style>
