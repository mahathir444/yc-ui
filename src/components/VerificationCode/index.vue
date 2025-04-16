<template>
  <div :class="['yc-verification-code', SIZE_CLASS[size]]">
    <yc-input
      v-for="(v, i) in lengthArray"
      :key="v"
      v-model="computedValue[i]"
      :size="size"
      :disabled="disabled"
      :error="error"
      :invisible-button="false"
      :max-length="1"
      :word-slice="(val) => val[val.length - 1]"
      :input-attrs="{
        type: masked ? 'password' : 'text',
      }"
      :ref="(el) => (inputRef[i] = el as InputInstance)"
      :readonly="readonly || (i != curIndex && !computedValue[i])"
      :class="{
        'yc-input-disabled-write': i != curIndex && !computedValue[i],
      }"
      @click="handleClick(i)"
      @mousedown="handleMousedown($event, i)"
      @focus="curIndex = i"
      @input="(v, ev) => handleInput(v, ev, i)"
      @change="$emit('change', computedValue.join(''))"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { VerificationCodeProps } from './type';
import useControlValue from '@shared/hooks/useControlValue';
import { SIZE_CLASS } from '@shared/constants/verification-code';
import { sleep } from '@shared/utils/fn';
import { nanoid } from 'nanoid';
import YcInput, { InputInstance } from '@/components/Input';
defineOptions({
  name: 'VerificationCode',
});
const props = withDefaults(defineProps<VerificationCodeProps>(), {
  modelValue: undefined,
  defaultValue: '',
  length: 6,
  size: 'large',
  disabled: false,
  readonly: false,
  error: false,
  marked: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event, i: number): void;
  (e: 'change', value: string): void;
  (e: 'finish', value: string): void;
}>();
const { modelValue, defaultValue, length } = toRefs(props);
// 受控值
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => {
    const inputValue = val.join('');
    if (val.length == length.value) {
      emits('finish', inputValue);
    }
    emits('update:modelValue', inputValue);
  },
  (val) => {
    return [...val].concat(new Array(length.value - val.length).fill(''));
  }
);
// 输入实例
const inputRef = ref<InputInstance[]>([]);
// lengthArray
const lengthArray = computed(() =>
  new Array(length.value).fill('').map(() => nanoid())
);
// 当前的索引
const curIndex = ref<number>(0);
// 处理输入
const handleInput = async (v: string, ev: Event, i: number) => {
  emits('input', computedValue.value.join(''), ev, i);
  if (v && curIndex.value < length.value - 1) {
    inputRef.value[curIndex.value].blur();
    curIndex.value++;
    await sleep(0);
    inputRef.value[curIndex.value].focus();
  }
};
// 处理点击
const handleClick = async (i: number) => {
  if (computedValue.value[i] || !i) return;
  const index = (computedValue.value as string[]).findIndex((item) => !item);
  await sleep(0);
  inputRef.value[index]?.focus();
};
const handleMousedown = (e: MouseEvent, i: number) => {
  if (curIndex.value != i && !computedValue.value[i]) {
    e.preventDefault();
  }
};
</script>

<style lang="less" scoped>
.yc-verification-code {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .yc-input-wrapper {
    padding: 0;
    &:deep(.yc-input) {
      text-align: center;
    }
  }
  .yc-input-disabled-write {
    opacity: 1;
    cursor: text;
    &:hover {
      background-color: rgb(229, 230, 235);
    }
    &:focus-within {
      border-color: transparent;
    }
  }
}
// size
.yc-verification-code-size-mini {
  .yc-input-wrapper {
    width: 24px;
  }
}
.yc-verification-code-size-small {
  .yc-input-wrapper {
    width: 28px;
  }
}
.yc-verification-code-size-medium {
  .yc-input-wrapper {
    width: 32px;
  }
}
.yc-verification-code-size-large {
  .yc-input-wrapper {
    width: 36px;
  }
}
</style>
