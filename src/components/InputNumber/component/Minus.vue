<template>
  <yc-button
    :size="size"
    :disabled="disabledMinus"
    :class="{
      'yc-input-number-plus-embed': mode == 'embed',
    }"
    @click="$emit('minus')"
  >
    <template #icon>
      <slot name="icon">
        <yc-icon :name="mode == 'embed' ? 'arrow-right' : 'minus'" />
      </slot>
    </template>
  </yc-button>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { Size } from '@/components/_type';
const props = defineProps<{
  mode: string;
  disabled: boolean;
  computedValue: string;
  min: number;
  size: Size;
}>();
defineEmits<{
  (e: 'minus'): void;
}>();
const { disabled, computedValue, min } = toRefs(props);
// 禁用递减
const disabledMinus = computed(() => {
  return disabled.value || +computedValue.value == min.value;
});
</script>

<style lang="less" scoped>
.yc-input-number-plus-embed {
  height: 11px;
  width: 18px !important;
  &:deep(.yc-button-icon) {
    height: 10px;
    width: 10px;
    font-size: 10px;
    margin: 0;
    transform: rotate(-90deg);
  }
}
</style>
