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
import { toRefs } from 'vue';
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
</script>

<style lang="less" scoped>
.yc-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
