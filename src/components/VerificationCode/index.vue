<template>
  <div :class="['yc-verification-code', VERIFICATION_CODE_SIZE_CLASS[size]]">
    <template v-for="(v, i) in length" :key="v">
      <yc-input
        :model-value="inputValue[i]"
        :size="size"
        :disabled="disabled"
        :error="error"
        :invisible-button="false"
        :visibility="masked"
        :readonly="readonly || !isWritable(i)"
        :class="{ 'yc-input-disabled-write': !isWritable(i) }"
        :ref="(el) => (inputList[i] = el as InputInstance)"
        @click="handleClick(i)"
        @mousedown="handleMousedown($event, i)"
        @input="(v, ev) => handleInput(v, ev, i)"
        @change="$emit('change', computedValue)"
      />
      <component
        v-if="separator?.(i, inputValue[i])"
        :is="separator(i, inputValue[i])"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { VerificationCodeProps } from './type';
import { useControlValue, useConfigProvder } from '@shared/hooks';
import { VERIFICATION_CODE_SIZE_CLASS } from '@shared/constants';
import { sleep } from '@shared/utils';
import { nanoid } from 'nanoid';
import YcInput, { InputInstance } from '@/components/Input';
defineOptions({
  name: 'VerificationCode',
});
const props = withDefaults(defineProps<VerificationCodeProps>(), {
  modelValue: void 0,
  defaultValue: '',
  length: 6,
  size: void 0,
  disabled: false,
  readonly: false,
  error: false,
  marked: true,
  formatter: void 0,
  separator: void 0,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event, i: number): void;
  (e: 'change', value: string): void;
  (e: 'finish', value: string): void;
}>();
const { modelValue, defaultValue, length: _length } = toRefs(props);
const { formatter } = props;
// 接收传入的属性
const { size } = useConfigProvder(props);
// 受控值
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => {
    if (val.length == _length.value) {
      emits('finish', val);
    }
    emits('update:modelValue', val);
  }
);
// lengthArray
const length = computed(() =>
  new Array(_length.value).fill('').map(() => nanoid())
);
// 输入值
const inputValue = computed(() => {
  const base = [...computedValue.value];
  for (let i = base.length; i < _length.value; i++) {
    base[i] = '';
  }
  return base;
});
// 输入实例
const inputList = ref<InputInstance[]>([]);
// 是否可写
const isWritable = (i: number) => {
  for (let k = 1; k < i; k++) {
    if (!inputValue.value[k]) return false;
  }
  return true;
};
// 处理输入
const handleInput = async (v: string, ev: Event, i: number) => {
  // 处理字符串
  const value = (v ? v.at(v.length - 1) : ' ') as string;
  // 触发事件
  emits('input', value, ev, i);
  // 拼接字符串
  computedValue.value =
    computedValue.value.slice(0, i) + value + computedValue.value.slice(i + 1);
  if (v && !inputValue.value[i + 1] && i < _length.value - 1) {
    inputList.value[i].blur();
    await sleep(0);
    inputList.value[i + 1].focus();
  }
};
// 处理mosuedown
const handleMousedown = (e: MouseEvent, i: number) => {
  if (isWritable(i)) return;
  e.preventDefault();
};
// 处理点击
const handleClick = async (i: number) => {
  if (isWritable(i)) return;
  const index = inputValue.value.findIndex((item) => !item);
  await sleep(0);
  inputList.value[index]?.focus();
};
</script>

<style lang="less" scoped>
@import './style/verification-code.less';
</style>
