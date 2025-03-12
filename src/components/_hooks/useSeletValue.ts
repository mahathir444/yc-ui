import { computed, provide, ref, Ref } from 'vue';
import useControlValue from './useControlValue';
import { OptionProps, SelectValue } from '@/components/Select/type';
import { Fn } from '../_type';

export default (params: {
  modelValue: Ref<SelectValue | SelectValue[] | undefined>;
  defaultValue: Ref<SelectValue | SelectValue[]>;
  inputValue: Ref<string | undefined>;
  defaultInputValue: Ref<string>;
  emits: Fn;
}) => {
  const { modelValue, defaultValue, inputValue, defaultInputValue, emits } =
    params;
  //可见性
  const popupVisible = ref<boolean>(false);
  provide('popupVisible', popupVisible);
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
    popupVisible,
    computedValue,
    computedLabel,
    computedInputValue,
    selectOptions,
    searchOptions,
  };
};
