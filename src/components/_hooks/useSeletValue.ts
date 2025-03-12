import { computed, provide, ref, Ref } from 'vue';
import useControlValue from './useControlValue';
import {
  OptionProps,
  SelectOptionData,
  SelectValue,
} from '@/components/Select/type';
import { Fn } from '../_type';

export default (params: {
  popupVisible: Ref<boolean | undefined>;
  defaultPopupVisible: Ref<boolean>;
  modelValue: Ref<SelectValue | SelectValue[] | undefined>;
  defaultValue: Ref<SelectValue | SelectValue[]>;
  inputValue: Ref<string | undefined>;
  defaultInputValue: Ref<string>;
  options: Ref<SelectOptionData[]>;
  emits: Fn;
}) => {
  const {
    popupVisible,
    defaultPopupVisible,
    modelValue,
    defaultValue,
    inputValue,
    defaultInputValue,
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
  provide('computedValue', computedValue);
  // 显示label
  const computedLabel = ref<string>('');
  provide('computedLabel', computedLabel);
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
  const selectOptions = ref<OptionProps[]>([]);
  provide('selectOptions', selectOptions);
  // 搜索项
  const searchOptions = computed(() => {
    return selectOptions.value.filter((item) =>
      item.label?.includes(computedInputValue.value)
    );
  });
  return {
    computedVisible,
    computedValue,
    computedLabel,
    computedInputValue,
    selectOptions,
    searchOptions,
  };
};
