<template>
  <div class="yc-verification-code">
    <yc-input
      v-for="i in length"
      :key="i"
      v-model="computedValue[i - 1]"
      :size="size"
      :disabled="disabled"
      :error="error"
      :readonly="readonly"
      :invisible-button="false"
      :max-length="1"
      :word-slice="(val) => val[val.length - 1]"
      :input-attrs="{
        type: masked ? 'password' : 'text',
      }"
      :ref="(el) => (inputRef[i] = el as InputInstance)"
      @input="(v, ev) => handleInput(v, ev, i)"
      @change="$emit('change', computedValue.join(''))"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { VerificationCodeProps } from './type';
import useControlValue from '@shared/hooks/useControlValue';
import { sleep } from '@shared/utils/fn';
import YcInput, { InputInstance } from '@/components/Input';
defineOptions({
  name: 'VerificationCode',
});
const props = withDefaults(defineProps<VerificationCodeProps>(), {
  modelValue: undefined,
  defaultValue: '',
  length: 6,
  size: 'medium',
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
// 输入实例
const inputRef = ref<InputInstance[]>([]);
// 受控值
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val.join(''));
  },
  (val) => {
    return [...val].map((item) => (item ? item : ''));
  }
);
// 处理输入
const handleInput = async (v: string, ev: Event, i: number) => {
  emits('input', computedValue.value.join(''), ev, i);
  if (v && i < length.value) {
    inputRef.value[i].blur();
    await sleep(0);
    inputRef.value[i + 1].focus();
  }
};
</script>

<style lang="less" scoped>
.yc-verification-code {
  display: flex;
  align-items: center;
  gap: 20px;
  .yc-input-wrapper {
    width: 32px;
    padding: 0;
    &:deep(.yc-input) {
      text-align: center;
    }
  }
}
</style>
