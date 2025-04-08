<template>
  <yc-prevent-focus
    tag="label"
    :prevent-focus="preventFocus"
    :class="{
      'yc-checkbox': true,
      'yc-checkbox-disabled': disabled,
      'yc-checkbox-checked': computedChecked && !indeterminate,
      'yc-checkbox-indeterminate': indeterminate && !computedChecked,
    }"
  >
    <input
      type="checkbox"
      class="yc-checkbox-target"
      :value="value"
      :disabled="disabled"
      :checked="computedChecked"
      @change="handleCollect"
    />
    <slot name="checkbox" :checked="computedChecked" :disabled="disabled">
      <yc-icon-button
        hover-size="24px"
        :hover-color="
          computedChecked || disabled ? 'transparent' : 'rgb(242, 243, 245)'
        "
      >
        <template #icon>
          <span class="yc-checkbox-icon">
            <icon-check v-show="computedChecked" :size="[8, 10]" />
          </span>
        </template>
      </yc-icon-button>
      <span class="yc-checkbox-label text-ellipsis">
        <slot />
      </span>
    </slot>
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { toRefs, inject, computed, ref } from 'vue';
import { CheckboxProps, CheckboxProvide } from './type';
import { CHECKBOX_GROUP_PROVIDE_KEY } from '@shared/constants';
import useControlValue from '@shared/hooks/useControlValue';
import { IconCheck } from '@shared/icons';
import YcPreventFocus from '@shared/components/PreventFocus';
import YcIconButton from '@shared/components/IconButton';

defineOptions({
  name: 'Checkbox',
});
const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  value: '',
  indeterminate: false,
  preventFocus: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean, ev: Event): void;
}>();
const {
  modelValue,
  defaultChecked,
  disabled: _disabled,
  value: checkboxValue,
} = toRefs(props);
// 接收的值
const {
  computedValue,
  max,
  disabled: injectDisabled,
} = inject<CheckboxProvide>(CHECKBOX_GROUP_PROVIDE_KEY, {
  computedValue: ref(undefined),
  max: ref(undefined),
  disabled: _disabled,
});
// checkbox受控的值
const _checked = useControlValue<boolean>(
  modelValue,
  defaultChecked.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 用于显示的值
const computedChecked = computed(() => {
  if (!computedValue.value) return _checked.value;
  return computedValue.value.includes(checkboxValue.value);
});
// 禁用
const disabled = computed(() => {
  if (!max.value || !computedValue.value) return injectDisabled.value;
  return computedValue.value.length >= max.value && !computedChecked.value;
});
// 处理check发生改变
const handleCollect = (e: Event) => {
  // 如果外面没有嵌套checkbox-group则执行收集就可以了
  if (!computedValue.value) {
    _checked.value = (e.target as HTMLInputElement)?.checked;
    return emits('change', _checked.value, e);
  }
  const { value } = checkboxValue;
  // true->false
  if (computedChecked.value) {
    computedValue.value = computedValue.value.filter((item) => item != value);
  } else {
    computedValue.value = [...computedValue.value, value];
  }
};
</script>

<style lang="less" scoped>
@import './style/checkbox.less';
</style>
