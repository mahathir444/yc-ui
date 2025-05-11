<template>
  <div
    :class="[
      type == 'radio' ? 'yc-radio-group' : 'yc-radio-button-group',
      type == 'radio'
        ? `yc-radio-group-direction-${direction}`
        : `yc-radio-button-group-size-${size}`,
    ]"
  >
    <slot />
    <yc-radio
      v-for="(item, index) in options"
      :key="index"
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
import { RadioGroupProps, RadioGroupEmits, RadioGroupSlots } from './type';
import useProvide from './hooks/useProvide';
import YcRadio from './Radio.vue';
defineOptions({
  name: 'RadioGroup',
});
defineSlots<RadioGroupSlots>();
const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  defaultValue: '',
  type: 'radio',
  size: undefined,
  options: () => [],
  direction: 'horizontal',
  disabled: false,
});
const emits = defineEmits<RadioGroupEmits>();
// 注入数据
const { provide } = useProvide();
provide(props, emits);
</script>

<style lang="less">
@import './style/radio-group.less';
</style>
