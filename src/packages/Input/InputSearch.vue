<template>
  <yc-input
    v-bind="props"
    ref="baseInputRef"
    class="yc-input-password"
    @input="handleInput"
    @change="handleChange"
    @clear="handleClear"
    @focus="(e) => emits('focus', e)"
    @blur="(e) => emits('blur', e)"
    @press-enter="(e) => emits('press-enter', e)"
  >
    <template v-if="searchButton" #append>
      <yc-button type="primary">
        <svg-icon name="search" size="14" />
      </yc-button>
    </template>
    <template v-else #extra>
      <yc-icon-button name="search" size="14" @click="emits('search', '')" />
    </template>
  </yc-input>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { InputSearch } from './type';
import YcInput from './InputBase.vue';
import YcButton from '@/packages/Button/index.vue';
import YcIconButton from '@/components/IconButton/index.vue';
const props = withDefaults(defineProps<InputSearch>(), {
  modelValue: undefined,
  defaultValue: undefined,
  size: 'medium',
  allowClear: false,
  disabled: false,
  readonly: false,
  error: false,
  showWordLimit: false,
  maxLength: 10,
  placeholder: '',
  searchButton: true,
  loading: false,
  buttonText: '',
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'press-enter', ev: KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'search', value: string): void;
}>();
// 组件实例
const baseInputRef = ref<InstanceType<typeof YcInput>>();
// 处理输入
const handleInput = (value: string, ev: Event) => {
  emits('input', value, ev);
  emits('update:modelValue', value);
};
// 处理改变
const handleChange = (value: string, ev: Event) => {
  emits('change', value, ev);
  emits('update:modelValue', value);
};
// 处理清除
const handleClear = (e: MouseEvent) => {
  emits('clear', e);
  emits('update:modelValue', '');
};

defineExpose({
  focus() {
    baseInputRef.value?.focus();
  },
  blur() {
    baseInputRef.value?.blur();
  },
});
</script>

<style lang="less" scoped></style>
