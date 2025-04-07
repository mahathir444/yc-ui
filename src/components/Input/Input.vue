<template>
  <!-- yc-input-outer -->
  <!-- v-if="$slots.append || $slots.prepend" -->
  <div
    :class="{
      'yc-input-outer': true,
      'yc-input-outer-disabled': disabled,
      'yc-input-has-prepend': $slots.prepend,
      'yc-input-has-append': $slots.append,
      'yc-input-search-append ': isSearch && searchButton,
    }"
  >
    <!-- prepend -->
    <yc-prevent-focus v-if="$slots.prepend" class="yc-input-prepend">
      <slot name="prepend" />
    </yc-prevent-focus>
    <!-- input-wrraper -->
    <base-input>
      <template v-if="$slots.label" #label>
        <slot name="label" />
      </template>
      <template v-if="$slots.prefix" #label>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.suffix" #label>
        <slot name="suffix" />
      </template>
    </base-input>
    <!-- append -->
    <yc-prevent-focus v-if="$slots.append" class="yc-input-append">
      <slot name="append">
        <yc-button
          v-if="isSearch && searchButton"
          :loading="loading"
          type="primary"
          v-bind="buttonProps"
          @click="emits('search', inputRef!.getInputValue())"
        >
          <template #icon>
            <icon-search />
          </template>
          <template v-if="buttonText" #default>
            {{ buttonText }}
          </template>
        </yc-button>
      </slot>
    </yc-prevent-focus>
  </div>
  <!-- yc-input-wrapper"  -->
  <!-- <base-input>
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots.prefix" #label>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #label>
      <slot name="suffix" />
    </template>
  </base-input> -->
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
import { InputProps } from './type';
import BaseInput from './Base.vue';
import YcPreventFocus from '@shared/components/PreventFocus';
defineOptions({
  name: 'Input',
});
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: undefined,
  defaultValue: '',
  size: 'medium',
  allowClear: false,
  disabled: false,
  readonly: false,
  error: false,
  maxLength: undefined,
  showWordLimit: false,
  placeholder: '',
  inputAttrs: () => {
    return {};
  },
  prepend: '',
  append: '',
  wordLength: (value: string) => {
    return value.length;
  },
  wordSlice: (value: string, maxLength: number) => {
    return value.slice(0, maxLength);
  },
  // password
  isPassword: false,
  visibility: undefined,
  defaultVisibility: false,
  invisibleButton: true,
  // search
  isSearch: false,
  searchButton: false,
  loading: false,
  buttonText: '',
  buttonProps: () => {
    return {};
  },
  // select
  showInput: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:visibility', value: boolean): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'pressEnter', ev: KeyboardEvent): void;
  (e: 'keydown', ev: KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'visibilityChange', value: boolean): void;
  (e: 'search', value: string): void;
}>();
provide('props', props);
// 注入emits
provide('emits', emits);
// 输入实例
const inputRef = ref<InstanceType<typeof BaseInput>>();
// 暴露方法
defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
  getInputRef() {
    return inputRef.value?.getInputRef();
  },
});
</script>

<style lang="less" scoped>
@import './style/input.less';
</style>
