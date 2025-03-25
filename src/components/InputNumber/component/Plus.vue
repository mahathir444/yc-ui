<template>
  <yc-button
    :size="size"
    :disabled="disabledPlus"
    :class="{
      'yc-input-number-plus-embed': mode == 'embed',
    }"
    :style="{
      height: mode == 'embed' ? '11px' : '',
      width: mode == 'embed' ? '18px' : '',
    }"
    @click="$emit('plus')"
  >
    <template #icon>
      <slot name="icon">
        <yc-icon :name="mode == 'embed' ? 'arrow-right' : 'plus'" />
      </slot>
    </template>
  </yc-button>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { Size } from '@/components/_/type';
import { InputNumberMode, InputNumberValue } from '../type';
import YcButton from '@/components/Button';
const props = defineProps<{
  mode: InputNumberMode;
  computedValue: InputNumberValue;
  disabled: boolean;
  max: number;
  size: Size;
}>();
defineEmits<{
  (e: 'plus'): void;
}>();
const { disabled, computedValue, max } = toRefs(props);
// 禁用递减
const disabledPlus = computed(() => {
  return disabled.value || +computedValue.value >= max.value;
});
</script>

<style lang="less" scoped>
.yc-input-number-plus-embed {
  height: 11px;
  &:deep(.yc-button-icon) {
    height: 10px;
    width: 10px;
    font-size: 10px;
    margin: 0;
    transform: rotate(90deg);
  }
}
</style>
