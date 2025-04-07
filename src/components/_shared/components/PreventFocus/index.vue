<template>
  <div
    v-if="tag == 'div'"
    ref="htmlRef"
    @mousedown="(e) => preventFocus && e.preventDefault()"
  >
    <slot />
  </div>
  <label
    v-else-if="tag == 'label'"
    ref="htmlRef"
    @mousedown="(e) => preventFocus && e.preventDefault()"
  >
    <slot />
  </label>
  <span
    v-else
    ref="htmlRef"
    @mousedown="(e) => preventFocus && e.preventDefault()"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
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
const htmlRef = ref<HTMLElement>();

defineExpose({
  getRef() {
    return htmlRef.value as HTMLElement;
  },
});
</script>
