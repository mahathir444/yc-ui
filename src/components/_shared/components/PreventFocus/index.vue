<template>
  <div
    v-if="tag == 'div'"
    @mousedown="(e) => preventFocus && e.preventDefault()"
  >
    <slot />
  </div>
  <label
    v-else-if="tag == 'label'"
    @mousedown="(e) => preventFocus && e.preventDefault()"
  >
    <slot />
  </label>
  <span v-else @mousedown="(e) => preventFocus && e.preventDefault()">
    <slot />
  </span>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'PreventFocus',
});
withDefaults(
  defineProps<{
    preventFocus?: boolean;
    tag?: 'div' | 'label' | 'span';
  }>(),
  {
    preventFocus: true,
    tag: 'div',
  }
);
</script>
