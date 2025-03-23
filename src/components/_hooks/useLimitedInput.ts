import { computed, Ref, nextTick } from 'vue';
import { InputEventType, WordLength, WordSlice } from '../Input/type';
import { isFunction, isNumber, isUndefined } from '../_utils/is';
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
    maxLength,
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
  // 是否展示字数限制
  const showLimited = computed(() => {
    return isNumber(maxLength.value) && showWordLimit.value;
  });
  // 最大长度
  const _maxLength = computed(() => {
    return isNumber(maxLength.value) && isFunction(wordLength)
      ? undefined
      : maxLength.value;
  });
  // wordLeng下的maxLength
  let wordLengthMax = 0;
  //   当前显示的长度
  const curLength = computed(() => {
    return isFunction(wordLength)
      ? wordLength?.(computedValue.value)
      : computedValue.value.length;
  });
  // 处理限制输入
  const handleLimitedInput = async (e: Event, type: InputEventType) => {
    const target = e.target as HTMLInputElement;
    // 计算wordLength下面的最大值
    if (curLength.value == maxLength.value) {
      wordLengthMax = computedValue.value.length;
    }
    if (
      isUndefined(_maxLength.value) &&
      curLength.value > (maxLength.value as number)
    ) {
      computedValue.value = wordSlice(computedValue.value, wordLengthMax);
    }
    emits(type as any, target.value, e as Event);
    await nextTick();
    if (computedValue.value !== target.value) {
      target.value = computedValue.value;
    }
  };

  return {
    computedValue,
    curLength,
    _maxLength,
    showLimited,
    handleLimitedInput,
  };
};
