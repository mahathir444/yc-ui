<template>
  <div
    :class="{
      'yc-radio-group': true,
      'yc-radio-group-direction-horizontal': direction == 'horizontal',
      'yc-radio-group-direction-vertical': direction == 'vertical',
    }"
  >
    <slot />
    <yc-radio
      v-for="item in options"
      :key="<string>item.value"
      :value="item.value"
      :disabled="item.disabled"
    >
      <!-- radio -->
      <template v-if="$slots.radio" #radio="{ checked, disabled }">
        <slot name="radio" :checked="checked" :disabled="disabled" />
      </template>
      <!-- label -->
      <slot name="label" :data="item">
        {{ item.label }}
      </slot>
    </yc-radio>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, provide } from 'vue';
import { RadioGroupProps, RadioValue, ProvideType } from './type';
import { RADIO_GROUP_PROVIDE_KEY } from '@/components/_constants';
import useControlValue from '@/components/_hooks/useControlValue';
import YcRadio from './Radio.vue';
defineOptions({
  name: 'RadioGroup',
});
const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  defaultValue: '',
  type: 'radio',
  options: () => [],
  direction: 'horizontal',
  disabled: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: RadioValue): void;
  (e: 'change', value: RadioValue, ev: Event): void;
}>();
const { modelValue, defaultValue, disabled, type } = toRefs(props);
// 受控值
const computedValue = useControlValue<RadioValue>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 提供给子组件
provide<ProvideType>(RADIO_GROUP_PROVIDE_KEY, {
  computedValue,
  type,
  disabled,
});
</script>

<style lang="less"></style>
