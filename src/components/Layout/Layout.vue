<template>
  <section
    class="yc-layout"
    :class="{
      'yc-layout-has-sider': hasSider,
    }"
  >
    <slot />
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, useSlots, VNode } from 'vue';
import { Sider } from './index';
import { ObjectData } from '@shared/type';
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
const slots = useSlots();
const hasSider = computed(() => {
  console.log(slots.default?.());
  const nodes = slots.default?.() as ObjectData[];
  const result = (nodes || []).filter((node) => {
    return node.type.name == Sider.name;
  }) as VNode[];
  console.log(result);

  return result;
});
</script>

<style lang="less" scoped>
.yc-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
