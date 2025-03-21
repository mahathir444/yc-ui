<template>
  <div
    :class="[
      type == 'radio' ? 'yc-radio-group' : 'yc-radio-button-group',
      type == 'radio' && direction == 'horizontal'
        ? 'yc-radio-group-direction-horizontal'
        : '',
      type == 'radio' && direction == 'vertical'
        ? 'yc-radio-group-direction-vertical'
        : '',
      type == 'button' ? SIZE_CLASS[size] : '',
    ]"
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
import { SIZE_CLASS } from './constants';
import { RADIO_GROUP_PROVIDE_KEY } from '@/components/_constants';
import useControlValue from '@/components/_hooks/useControlValue';
import YcRadio from './Radio.vue';
defineOptions({
  name: 'RadioGroup',
});
const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  defaultValue: '',
  type: 'button',
  size: 'medium',
  options: () => [],
  direction: 'horizontal',
  disabled: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: RadioValue): void;
  (e: 'change', value: RadioValue, ev: Event): void;
}>();
const { modelValue, defaultValue, disabled, type, size } = toRefs(props);
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
  size,
});
</script>

<style lang="less">
@import './style/radio-group.less';
</style>
