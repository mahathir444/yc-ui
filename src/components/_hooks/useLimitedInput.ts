import { computed, Ref } from 'vue';
import { WordLength, WordSlice } from '../Input/type';
import { isFunction, isNumber } from '../_utils/is';
import useControlValue from '../_hooks/useControlValue';
import { Fn } from '../_type';
export default (params: {
  modelValue: Ref<string | undefined>;
  defaultValue: Ref<string>;
  maxLength: Ref<number | undefined>;
  showWordLimit: Ref<boolean>;
  wordSlice: WordSlice;
  wordLength?: WordLength;
  emits: Fn;
}) => {
  const {
    modelValue,
    defaultValue,
    showWordLimit,
    maxLength: _maxLength,
    wordLength,
    wordSlice,
    emits,
  } = params;
  // 受控值
  const computedValue = useControlValue<string>(
    modelValue,
    defaultValue.value,
    (val) => emits('update:modelValue', val)
  );
  // 是否限制
  const isLimited = computed(() => {
    return isNumber(_maxLength.value) && isFunction(wordLength);
  });
  // 是否展示字数限制
  const showLimited = computed(() => {
    return isLimited.value && showWordLimit.value;
  });
  //   当前显示的长度
  const curLength = computed(() => {
    return isLimited.value
      ? wordLength?.(computedValue.value)
      : computedValue.value;
  });
  // 最大长度
  const maxLength = computed(() => {
    return isLimited.value ? null : _maxLength.value;
  });
  // 处理限制输入
  const handleLimitedInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (isLimited.value && curLength.value > (_maxLength.value as number)) {
      computedValue.value = wordSlice(computedValue.value, curLength.value);
    }
    if (computedValue.value !== target.value) {
      target.value = computedValue.value;
    }
  };

  return {
    computedValue,
    curLength,
    maxLength,
    showLimited,
    isLimited,
    handleLimitedInput,
  };
};
