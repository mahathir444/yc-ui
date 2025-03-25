<template>
  <yc-button
    :size="size"
    :disabled="disabledMinus"
    :class="{
      'yc-input-number-plus-embed': mode == 'embed',
    }"
    :style="{
      height: mode == 'embed' ? '11px' : '',
      width: mode == 'embed' ? '18px' : '',
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
import { Size } from '@shared/type';
import { InputNumberMode, InputNumberValue } from '../type';
const props = defineProps<{
  mode: InputNumberMode;
  disabled: boolean;
  computedValue: InputNumberValue;
  min: number;
  size: Size;
}>();
defineEmits<{
  (e: 'minus'): void;
}>();
const { disabled, computedValue, min } = toRefs(props);
// 禁用递减
const disabledMinus = computed(() => {
  return disabled.value || +computedValue.value <= min.value;
});
</script>

<style lang="less" scoped>
.yc-input-number-plus-embed {
  &:deep(.yc-button-icon) {
    height: 10px;
    width: 10px;
    font-size: 10px;
    margin: 0;
    transform: rotate(-90deg);
  }
}
</style>
