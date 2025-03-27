<template>
  <yc-auto-complete
    v-if="type == 'input'"
    :popupVisible="popupVisible"
    :data="data"
    :allow-search="false"
    @select="handleSelect"
  >
    <template #trigger>
      <yc-input
        v-model="computedValue"
        :disabled="disabled"
        :allow-clear="allowClear"
        @input="handleInput"
        @blur="popupVisible = false"
        class="yc-mention"
      />
    </template>
  </yc-auto-complete>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { SelectOptions } from '@/components/Select';
import { nanoid } from 'nanoid';
import useControlValue from '@shared/hooks/useControlValue';
import useCursor from '@shared/hooks/useCursor';
import YcAutoComplete from '@/components/AutoComplete/index.vue';
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    defaultValue?: string;
    data?: SelectOptions;
    prefix?: string | string[];
    split?: string;
    type?: 'input' | 'textarea';
    disabled?: boolean;
    allowClear?: boolean;
  }>(),
  {
    modelValue: undefined,
    defaultValue: '',
    data: () => [],
    prefix: '@',
    split: '',
    type: 'input',
    disabled: false,
    allowClear: false,
  }
);
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const { modelValue, defaultValue, allowClear, disabled, prefix } =
  toRefs(props);
//   控制值
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => emits('update:modelValue', val)
);
// 可见性
const popupVisible = ref<boolean>(false);
// const { recordCursor, getCursor } = useCursor();
// 处理输入
const handleInput = (v: string, e: Event) => {
  computedValue.value = v;
  const { selectionStart } = e.target as HTMLInputElement;
  const cursor = (selectionStart as number) - 1;
  const ch = v[cursor];
  popupVisible.value = Array.isArray(prefix.value)
    ? prefix.value.includes(ch)
    : prefix.value == ch;
  console.log(popupVisible.value);
};
// 处理选中
const handleSelect = () => {};
</script>

<style lang="less" scoped></style>
