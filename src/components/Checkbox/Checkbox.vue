<template>
  <label
    :class="{
      'yc-checkbox': true,
      'yc-checkbox-hoverable': !computedChecked && !disabled,
      'yc-checkbox-checked': computedChecked && !indeterminate,
      'yc-checkbox-indeterminate': indeterminate && !computedChecked,
      'yc-checkbox-disabled': disabled,
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
            <svg-icon v-show="computedChecked" name="checked" :size="[8, 10]" />
          </span>
        </template>
      </yc-icon-button>
      <span @mousedown.prevent="" class="yc-checkbox-label text-ellipsis">
        <slot />
      </span>
    </slot>
  </label>
</template>

<script lang="ts" setup>
import {
  toRefs,
  Ref,
  inject,
  WritableComputedRef,
  computed,
  ref,
  watch,
} from 'vue';
import { CheckboxProps, CheckboxValue } from './type';
import useControlValue from '@/components/_hooks/useControlValue';
import YcIconButton from '@/components/_components/IconButton/index.vue';
defineOptions({
  name: 'Checkbox',
});
const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  value: '',
  indeterminate: false,
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
// checkgroup的值
const computedValue = inject<
  WritableComputedRef<CheckboxValue[]> | Ref<undefined>
>('computedValue', ref(undefined));
// checkgroup传入的最大勾选数
const max = inject('max', ref(undefined));
// group传入的disabled
const tempDisabled = inject('disabled', _disabled);
// 受控的值
const _checked = useControlValue<boolean>(
  modelValue,
  defaultChecked.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 计算的checked
const computedChecked = computed(() => {
  if (!computedValue.value) return _checked.value;
  return computedValue.value.includes(checkboxValue.value);
});
// 禁用
const disabled = computed(() => {
  if (!max.value || !computedValue.value) return tempDisabled.value;
  return computedValue.value.length >= max.value;
});
// 处理check发生改变
const handleCollect = (e: Event) => {
  // 如果外面没有嵌套checkbox-group则执行收集就可以了
  if (!computedValue.value) {
    _checked.value = (e.target as HTMLInputElement)?.checked;
    emits('change', _checked.value, e);
  } else {
    const { value } = checkboxValue;
    // false->true
    if (!computedChecked.value) {
      computedValue.value = [...computedValue.value, value];
    } else {
      computedValue.value = computedValue.value.filter((item) => item != value);
    }
  }
};
</script>

<style lang="less" scoped>
@import './style/checkbox.less';
</style>
