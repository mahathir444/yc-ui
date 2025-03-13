import { computed, provide, ref, Ref } from 'vue';
import useControlValue from './useControlValue';
import { OptionProps, SelectValue } from '@/components/Select/type';
import { Fn } from '../_type';
import { isArray } from '../_utils/is';

export default (params: {
  popupVisible: Ref<boolean | undefined>;
  defaultPopupVisible: Ref<boolean>;
  modelValue: Ref<SelectValue | SelectValue[] | undefined>;
  defaultValue: Ref<SelectValue | SelectValue[]>;
  inputValue: Ref<string | undefined>;
  defaultInputValue: Ref<string>;
  formatLabel: Fn;
  emits: Fn;
}) => {
  const {
    popupVisible,
    defaultPopupVisible,
    modelValue,
    defaultValue,
    inputValue,
    defaultInputValue,
    formatLabel,
    emits,
  } = params;
  // popupVisible
  const computedVisible = useControlValue<boolean>(
    popupVisible,
    defaultPopupVisible.value,
    (val) => {
      emits('update:popupVisible', val);
    }
  );
  provide('computedVisible', computedVisible);
  // modelValue
  const computedValue = useControlValue<SelectValue | SelectValue[]>(
    modelValue,
    defaultValue.value,
    (val) => {
      emits('change', val);
      emits('update:modelValue', val);
    }
  );
  // 当前的选项显示ide值
  const computedLabel = computed(() => {
    const option = optionList.value.filter((item) => {
      return isArray(computedValue.value)
        ? computedValue.value.includes(item.value)
        : computedValue.value == item.value;
    });
    if (!option.length) return '';
    return formatLabel(option);
  });
  provide('computedValue', computedValue);
  // 输入框的值
  const computedInputValue = useControlValue<string>(
    inputValue,
    defaultInputValue.value,
    (val) => {
      emits('update:inputValue', val);
    }
  );
  provide('computedInputValue', computedInputValue);
  // options数组
  const optionList = ref<OptionProps[]>([]);
  provide('optionList', optionList);
  // 搜索项
  const isEmpty = computed(() => {
    const filterResult = optionList.value.filter((item) =>
      item.label?.includes(computedInputValue.value)
    );
    return !filterResult.length;
  });
  return {
    computedVisible,
    computedValue,
    computedInputValue,
    isEmpty,
    computedLabel,
  };
};
