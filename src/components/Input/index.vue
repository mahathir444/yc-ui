<template>
  <!-- yc-input-outer -->
  <div
    v-if="$slots.append || $slots.prepend"
    :class="[
      'yc-input-outer',
      disabled ? 'yc-input-outer-disabled' : '',
      $slots.prepend ? 'yc-input-has-prepend' : '',
      $slots.append ? 'yc-input-has-append' : '',
      isSearch && searchButton ? 'yc-input-search-append' : '',
      INPUT_OUTER_SIZE_CLASS[size],
    ]"
  >
    <!-- prepend -->
    <yc-prevent-focus v-if="$slots.prepend" class="yc-input-prepend">
      <slot name="prepend" />
    </yc-prevent-focus>
    <!-- input-wrraper -->
    <yc-input ref="inputRef">
      <template v-if="$slots.label" #label>
        <slot name="label" />
      </template>
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix" />
      </template>
    </yc-input>
    <!-- append -->
    <yc-prevent-focus v-if="$slots.append" class="yc-input-append">
      <slot name="append" v-bind="props">
        <yc-button
          v-if="isSearch && searchButton"
          type="primary"
          :loading="loading"
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
  <yc-input v-else ref="inputRef">
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
  </yc-input>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
import { InputProps, InputEmits, InputProvide } from './type';
import { INPUT_OUTER_SIZE_CLASS } from '@shared/constants';
import { INPUT_PROVIDE_KEY } from '@shared/constants';
import YcInput from './component/Input.vue';
import { YcPreventFocus } from '@shared/components';
defineOptions({
  name: 'Input',
});
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: undefined,
  defaultValue: '',
  size: undefined,
  allowClear: false,
  disabled: false,
  readonly: false,
  error: undefined,
  maxLength: undefined,
  showWordLimit: false,
  placeholder: '',
  inputAttrs: () => {
    return {};
  },
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
const emits = defineEmits<InputEmits>();
provide<InputProvide>(INPUT_PROVIDE_KEY, {
  props,
  emits,
});
// 输入实例
const inputRef = ref<InstanceType<typeof YcInput>>();
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
