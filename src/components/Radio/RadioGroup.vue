<template>
  <div
    :class="[
      type == 'radio' ? 'yc-radio-group' : 'yc-radio-button-group',
      type == 'radio' ? RADIO_DIRECTION_MAP[direction] : RADIO_SIZE_CLASS[size],
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
import { RadioGroupProps, RadioValue, RadioProvide } from './type';
import { RADIO_SIZE_CLASS } from '@shared/constants';
import { RADIO_DIRECTION_MAP } from '@shared/constants';
import { RADIO_GROUP_PROVIDE_KEY } from '@shared/constants';
import { useControlValue, useConfigProvder } from '@shared/hooks';
import YcRadio from './Radio.vue';
defineOptions({
  name: 'RadioGroup',
});
const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  defaultValue: '',
  type: 'radio',
  size: undefined,
  options: () => [],
  direction: 'horizontal',
  disabled: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: RadioValue): void;
  (e: 'change', value: RadioValue, ev: Event): void;
}>();
const { modelValue, defaultValue, disabled, type } = toRefs(props);
// 获取全局配置
const { size } = useConfigProvder(props);
// 受控值
const computedValue = useControlValue<RadioValue>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 提供给子组件
provide<RadioProvide>(RADIO_GROUP_PROVIDE_KEY, {
  computedValue,
  type,
  disabled,
  size,
});
</script>

<style lang="less">
@import './style/radio-group.less';
</style>
