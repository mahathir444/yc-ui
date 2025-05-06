<template>
  <component
    :is="tag"
    class="yc-prevent-focus"
    ref="htmlRef"
    @mousedown="(e: MouseEvent) => preventFocus && e.preventDefault()"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
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
// 计算htmlRef
const htmlRef = ref<HTMLElement>();
defineExpose({
  getRef() {
    return htmlRef.value as HTMLElement;
  },
});
</script>
