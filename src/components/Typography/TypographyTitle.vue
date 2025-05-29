<template>
  <component :is="tag" class="arco-typography">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { TypographyTitleProps, TypographyTitleSlots } from './type';
defineOptions({
  name: 'TypographyTitle',
});
defineSlots<TypographyTitleSlots>();
const props = withDefaults(defineProps<TypographyTitleProps>(), {
  heading: '1',
});
const tag = computed(() => `h${props.heading}`);
</script>

<style lang="less" scoped></style>
