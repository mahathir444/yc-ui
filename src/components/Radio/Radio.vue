<template>
  <yc-prevent-focus
    tag="label"
    :prevent-focus="preventFocus"
    :class="[
      RADIO_SIZE_CLASS[size],
      type == 'radio' ? 'yc-radio' : 'yc-radio-button',
      disabled ? 'yc-radio-disabled' : '',
      computedChecked ? 'yc-radio-checked' : 'yc-radio-unchecked',
    ]"
  >
    <input
      type="radio"
      class="yc-radio-target"
      :value="value"
      :checked="computedChecked"
      :disabled="disabled"
      @change="handleCollect"
    />
    <slot name="radio" :checked="computedChecked" :disabled="disabled">
      <template v-if="type == 'radio'">
        <yc-icon-button
          :hover-size="24"
          :hover-color="
            computedChecked || disabled ? 'transparent' : 'rgb(242, 243, 245)'
          "
        >
          <span class="yc-radio-icon"> </span>
        </yc-icon-button>
        <span class="yc-radio-label text-ellipsis">
          <slot />
        </span>
      </template>
      <span v-else class="yc-radio-button-content">
        <slot />
      </span>
    </slot>
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { RadioProps, RadioEmits, RadioSlots, RadioValue } from './type';
import { RADIO_SIZE_CLASS } from '@shared/constants';
import { isUndefined } from '@shared/utils';
import { useControlValue } from '@shared/hooks';
import useProvide from './hooks/useProvide';
import { YcPreventFocus, YcIconButton } from '@shared/components';
defineOptions({
  name: 'Radio',
});
defineSlots<RadioSlots>();
const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  value: true,
  type: 'radio',
  preventFocus: false,
});
const emits = defineEmits<RadioEmits>();
const { modelValue, defaultChecked, value: radioValue } = toRefs(props);
// 接收注入
const { inject } = useProvide();
const { computedValue, disabled, type, size } = inject(props);
// checkbox受控的值
const _computedValue = useControlValue<RadioValue>(
  modelValue,
  defaultChecked.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 用于显示的值
const computedChecked = computed(() => {
  if (isUndefined(computedValue.value)) {
    return _computedValue.value == radioValue.value;
  } else {
    return computedValue.value == radioValue.value;
  }
});
// 处理check发生改变
const handleCollect = (e: Event) => {
  const { value } = radioValue;
  _computedValue.value = value;
  emits('change', _computedValue.value, e);
  if (isUndefined(computedValue.value)) return;
  computedValue.value = value;
};
</script>

<style lang="less" scoped>
@import './style/radio.less';
</style>
