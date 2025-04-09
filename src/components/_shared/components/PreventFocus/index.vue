<template>
  <div
    v-if="tag == 'div'"
    class="yc-prevent-focus"
    ref="htmlRef"
    @mousedown="(e) => preventFocus && e.preventDefault()"
  >
    <slot />
  </div>
  <label
    v-else-if="tag == 'label'"
    class="yc-prevent-focus"
    ref="htmlRef"
    @mousedown="(e) => preventFocus && e.preventDefault()"
  >
    <slot />
  </label>
  <span
    v-else
    class="yc-prevent-focus"
    ref="htmlRef"
    @mousedown="(e) => preventFocus && e.preventDefault()"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { PreventFocusProps } from './type';
defineOptions({
  name: 'PreventFocus',
});
withDefaults(defineProps<PreventFocusProps>(), {
  preventFocus: true,
  tag: 'div',
});
// 计算htmlRef
const htmlRef = ref<HTMLElement>();
defineExpose({
  getRef() {
    return htmlRef.value as HTMLElement;
  },
});
</script>
