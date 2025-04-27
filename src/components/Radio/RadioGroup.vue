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
import { RadioGroupProps, RadioGroupEmits } from './type';
import { RADIO_SIZE_CLASS } from '@shared/constants';
import { RADIO_DIRECTION_MAP } from '@shared/constants';
import useProvide from './hooks/useProvide';
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
const emits = defineEmits<RadioGroupEmits>();
// 注入数据
const { provide } = useProvide();
provide(props, emits);
</script>

<style lang="less">
@import './style/radio-group.less';
</style>
