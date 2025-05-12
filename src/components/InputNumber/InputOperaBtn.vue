<template>
  <yc-button
    :size="size"
    :disabled="disabledMinus"
    :class="{
      'yc-input-number-plus-embed': mode == 'embed',
    }"
    @click="$emit('click', type)"
  >
    <template #icon>
      <slot name="icon">
        <icon-arrow-up v-if="mode == 'embed' && type == 'minus'" />
        <icon-arrow-down v-if="mode == 'embed' && type == 'plus'" />
        <icon-minus v-else-if="mode == 'button' && type == 'minus'" />
        <icon-plus v-else-if="mode == 'button' && type == 'plus'" />
      </slot>
    </template>
  </yc-button>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { InputNumberMode, InputNumberValue } from './type';
import { Size } from '@shared/type';
import { IconArrowDown, IconArrowUp, IconPlus, IconMinus } from '@shared/icons';
import YcButton from '@/components/Button';
const props = defineProps<{
  mode: InputNumberMode;
  type: 'minus' | 'plus';
  disabled: boolean;
  computedValue: InputNumberValue;
  min: number;
  max: number;
  size?: Size;
}>();
defineEmits<{
  (e: 'click', type: 'minus' | 'plus'): void;
}>();
const { disabled, computedValue, min, max, type } = toRefs(props);
// 禁用递减
const disabledMinus = computed(() => {
  if (disabled.value) return disabled.value;
  return type.value == 'minus'
    ? +computedValue.value <= min.value
    : +computedValue.value >= max.value;
});
</script>

<style lang="less" scoped>
@import './style/input-number.less';
</style>
