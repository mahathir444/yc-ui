<template>
  <component
    :is="tag"
    class="yc-prevent-focus"
    @mousedown="(e: MouseEvent) => preventFocus && e.preventDefault()"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    preventFocus?: boolean;
    tag?: string;
  }>(),
  {
    preventFocus: true,
    tag: 'div',
  }
);
</script>
