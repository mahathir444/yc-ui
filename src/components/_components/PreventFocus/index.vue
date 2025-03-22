<template>
  <div
    v-if="renderTag == 'div'"
    @mousedown="(e) => preventFocus && e.preventDefault()"
  >
    <slot />
  </div>
  <label v-else @mousedown="(e) => preventFocus && e.preventDefault()">
    <slot />
  </label>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    preventFocus?: boolean;
    renderTag?: 'div' | 'label';
  }>(),
  {
    preventFocus: true,
    renderTag: 'div',
  }
);
</script>
