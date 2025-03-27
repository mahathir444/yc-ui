import { computed, Ref, ref } from 'vue';
import { Fn } from '../type';
import { isFunction, isNumber, isUndefined } from '../utils/is';
import { WordLength, WordSlice } from '@/components/Input';
import useControlValue from './useControlValue';
import useCursor from './useCursor';

export default (params: {
  modelValue: Ref<string | undefined>;
  defaultValue: Ref<string>;
  maxLength: Ref<number | undefined>;
  showWordLimit: Ref<boolean>;
  inputRef: Ref<HTMLInputElement | HTMLTextAreaElement | undefined>;
  wordSlice: WordSlice;
  wordLength: WordLength;
  emits: Fn;
}) => {
  const {
    modelValue,
    defaultValue,
    showWordLimit,
    maxLength,
    inputRef,
    wordLength,
    wordSlice,
    emits,
  } = params;
  const { setCursor, recordCursor } = useCursor(inputRef);
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
    return getValueLength(computedValue.value);
  });
  // 是否中文合成
  const isComposition = ref<boolean>(false);
  // 记录最大长度
  const recordWordMaxLength = () => {
    if (curLength.value == maxLength.value) {
      wordLengthMax = computedValue.value.length;
      console.log(wordLengthMax);
    }
  };
  // 计算wordMaxLength
  const calcWordMaxLength = (value: string) => {
    let str = '';
    for (let ch of value) {
      str = str + ch;
      if (getValueLength(str) == maxLength.value) {
        break;
      }
    }
    return str.length;
  };
  // 获取value的长度
  function getValueLength(value: string) {
    if (isFunction(wordLength)) {
      wordLength(value);
    }
    return value?.length || 0;
  }
  // 处理中文合成
  const handleComposition = (e: CompositionEvent) => {
    if (e.type === 'compositionend') {
      isComposition.value = false;
    } else {
      isComposition.value = true;
    }
  };
  // 保持受控
  const keepControl = () => {
    recordCursor();
    if (inputRef.value && computedValue.value !== inputRef.value.value) {
      inputRef.value.value = computedValue.value;
      setCursor();
    }
  };
  // 更新值
  const updateValue = () => {
    if (!isUndefined(maxLength.value) && curLength.value > maxLength.value) {
      computedValue.value = wordSlice(computedValue.value, wordLengthMax);
    }
  };
  // 处理限制输入
  const handleLimitedInput = async (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    const { inputType } = e as InputEvent;
    // 中文合成退出
    if (isComposition.value) {
      return;
    }
    if (
      inputType == 'insertFromPaste' &&
      !isUndefined(maxLength.value) &&
      getValueLength(value) > maxLength.value
    ) {
      computedValue.value = wordSlice(value, calcWordMaxLength(value));
      // keepControl();
      return;
    }
    recordWordMaxLength();
    updateValue();
    emits('input', value, e);
    keepControl();
  };

  return {
    computedValue,
    curLength,
    _maxLength,
    showLimited,
    isComposition,
    handleLimitedInput,
    handleComposition,
  };
};
