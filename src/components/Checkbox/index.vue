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
      @change="handleChange"
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
import { toRefs } from 'vue';
import { CheckboxProps } from './type';
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
const { modelValue, defaultChecked } = toRefs(props);
// 受控的值
const computedChecked = useControlValue<boolean>(
  modelValue,
  defaultChecked.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 处理check发生改变
const handleChange = (e: Event) => {
  computedChecked.value = (e.target as HTMLInputElement)?.checked;
  emits('change', computedChecked.value, e);
};
</script>

<style lang="less" scoped>
@import './style/checkbox.less';
</style>
