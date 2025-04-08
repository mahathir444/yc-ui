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
import { ref, toRefs, computed } from 'vue';
import { isNumber } from '@shared/utils/is';
defineOptions({
  name: 'PreventFocus',
});
const props = withDefaults(
  defineProps<{
    preventFocus?: boolean;
    tag?: 'div' | 'label' | 'span';
    fontSize: number | 'inherit';
  }>(),
  {
    preventFocus: true,
    tag: 'div',
    fontSize: 14,
  }
);
const { fontSize: _fontSize } = toRefs(props);
// 计算htmlRef
const htmlRef = ref<HTMLElement>();
// 计算fontSize
const fontSize = computed(() =>
  isNumber(_fontSize.value) ? `${_fontSize.value}px` : _fontSize.value
);

defineExpose({
  getRef() {
    return htmlRef.value as HTMLElement;
  },
});
</script>

<style lang="less">
.yc-prevent-focus {
  font-size: v-bind(fontSize);
}
</style>
