import { computed, Ref } from 'vue';
import { ObjectData } from '@shared/type';
import {
  SelectEmits,
  SelectValue,
  SelectOptions,
  FallbackOption,
  FormatLabel,
} from '../index';
import { useControlValue } from '@shared/hooks';
import useSelectOptions from './useSelectOptions';
import { TriggerInstance } from '@/components/Trigger';

export default (params: {
  popupVisible: Ref<boolean | undefined>;
  defaultPopupVisible: Ref<boolean>;
  modelValue: Ref<SelectValue | undefined>;
  defaultValue: Ref<SelectValue>;
  inputValue: Ref<string | undefined>;
  defaultInputValue: Ref<string>;
  fieldNames: Ref<Record<string, string>>;
  multiple: Ref<boolean>;
  provideOptions: Ref<SelectOptions>;
  showExtraOptions: Ref<boolean>;
  popupRef: Ref<TriggerInstance | undefined>;
  emits: SelectEmits;
  getValue: (value: string | ObjectData) => SelectValue;
  fallbackOption?: FallbackOption;
  formatLabel?: FormatLabel;
}) => {
  const {
    popupVisible,
    defaultPopupVisible,
    modelValue,
    defaultValue,
    inputValue,
    defaultInputValue,
    multiple,
    fieldNames,
    showExtraOptions,
    provideOptions,
    popupRef,
    formatLabel,
    fallbackOption,
    emits,
    getValue,
  } = params;
  // popupVisible
  const computedVisible = useControlValue<boolean>(
    popupVisible,
    defaultPopupVisible.value,
    (val) => {
      emits('update:popupVisible', val);
      emits('popupVisibleChange', val);
    }
  );
  // 当前选项
  const computedValue = useControlValue<SelectValue>(
    modelValue,
    defaultValue.value ? defaultValue.value : multiple.value ? [] : '',
    (val) => {
      emits('change', val);
      emits('update:modelValue', val);
    }
  );
  // 输入框的值
  const computedInputValue = useControlValue<string>(
    inputValue,
    defaultInputValue.value,
    (val) => {
      emits('update:inputValue', val);
    }
  );
  // fieldKey
  const fieldKey = computed(() => {
    return {
      label: fieldNames.value['label'] ?? 'label',
      value: fieldNames.value['value'] ?? 'value',
      disabled: fieldNames.value['disabled'] ?? 'disabled',
      tagProps: fieldNames.value['tagProps'] ?? 'tagProps',
      render: fieldNames.value['render'] ?? 'render',
    };
  });
  // 选中的value
  const selectValue = computed<ObjectData[]>(() =>
    multiple.value ? computedValue.value : [computedValue.value]
  );
  // 获取选项的值
  const { options, renderOptions } = useSelectOptions({
    popupRef,
    fieldKey,
    selectValue,
    showExtraOptions,
    provideOptions,
    getValue,
    fallbackOption,
  });
  // 选中的值
  const selectOptions = computed(() => {
    // 创建optionMap
    const optionMap = new Map(
      options.value.map((item) => [getValue(item.value), item])
    );
    // 计算input-tag需要显示的值
    return selectValue.value.map((v) => {
      const option = optionMap.get(getValue(v));
      return {
        id: `${v}`,
        label: formatLabel ? formatLabel(option) : option?.label,
        value: v,
        closeable: option?.tagProps?.closeable,
        tagProps: option?.tagProps,
      };
    });
  });
  // 搜索项
  const isEmpty = computed(() => {
    const filterResult = options.value.filter((item) =>
      item.label?.includes(computedInputValue.value)
    );
    return !filterResult.length;
  });
  return {
    computedVisible,
    computedValue,
    computedInputValue,
    fieldKey,
    selectOptions,
    options,
    renderOptions,
    isEmpty,
  };
};
