<template>
  <yc-prevent-focus
    tag="label"
    :prevent-focus="preventFocus"
    :class="[
      SIZE_CLASS[size],
      type == 'radio' ? 'yc-radio' : 'yc-radio-button',
      disabled ? 'yc-radio-disabled' : '',
      computedChecked ? 'yc-radio-checked' : '',
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
          hover-size="24px"
          :hover-color="
            computedChecked || disabled ? 'transparent' : 'rgb(242, 243, 245)'
          "
        >
          <template #icon>
            <span class="yc-radio-icon"> </span>
          </template>
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
import { toRefs, inject, computed, ref } from 'vue';
import { RadioProps, RadioValue, RadioProvide } from './type';
import { SIZE_CLASS } from './constants';
import { RADIO_GROUP_PROVIDE_KEY } from '@shared/constants';
import { isUndefined } from '@shared/utils/is';
import useControlValue from '@shared/hooks/useControlValue';
import YcPreventFocus from '@shared/components/PreventFocus';
import YcIconButton from '@shared/components/IconButton';
defineOptions({
  name: 'Radio',
});
const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  value: true,
  type: 'radio',
  preventFocus: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean, ev: Event): void;
}>();
const {
  modelValue,
  defaultChecked,
  value: radioValue,
  disabled: _disabled,
  type: _type,
} = toRefs(props);
// 接收的值
const { computedValue, disabled, type, size } = inject<RadioProvide>(
  RADIO_GROUP_PROVIDE_KEY,
  {
    computedValue: ref(undefined),
    disabled: _disabled,
    type: _type,
    size: ref('medium'),
  }
);
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
