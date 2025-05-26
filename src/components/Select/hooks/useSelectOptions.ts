import {
  computed,
  Ref,
  onMounted,
  onUpdated,
  reactive,
  toRefs,
  onBeforeUnmount,
} from 'vue';
import { nanoid } from 'nanoid';
import { ObjectData, Props } from '@shared/type';
import {
  OptionProps,
  SelectValue,
  SelectOptions,
  FallbackOption,
  FormatLabel,
  SelectOptionData,
} from '../index';
import { TriggerInstance } from '@/components/Trigger';
import { getTextContent, isObject } from '@shared/utils';

export default (params: {
  multiple: Ref<boolean>;
  computedValue: Ref<SelectValue>;
  computedInputValue: Ref<string>;
  fieldKey: Ref<Record<string, string>>;
  provideOptions: Ref<SelectOptions>;
  showExtraOptions: Ref<boolean>;
  popupRef: Ref<TriggerInstance | undefined>;
  getValue: (value: string | ObjectData) => SelectValue;
  fallbackOption?: FallbackOption;
  formatLabel?: FormatLabel;
}) => {
  const {
    computedValue,
    computedInputValue,
    multiple,
    provideOptions,
    getValue,
    fallbackOption,
    formatLabel,
  } = params;
  // optionMap
  const optionMap = reactive<Map<string, ObjectData>>(new Map());
  // 所有的options
  const options = computed(() => [...optionMap.values()]);
  // fallbackoption
  const fallbackOptions = computed(() => {
    if (!fallbackOption) return [];
    const valueMap = new Map(
      options.value.map((item) => [getValue(item.value), item])
    );
    return selectValue.value
      .filter((v) => valueMap.get(v))
      .map((v: SelectValue) => {
        const target = fallbackOption(v);
        return {
          ...(target || {}),
          isFallbackOption: true,
        };
      });
  });
  // 渲染的option数组
  const renderOptions = computed<SelectOptions>(() => {
    return [...provideOptions.value, ...fallbackOptions.value].map((item) => {
      return {
        id: nanoid(),
        ...(isObject(item)
          ? item
          : {
              label: item,
              value: item,
            }),
      };
    });
  });
  // 选中的value
  const selectValue = computed(() => {
    const value = multiple.value ? computedValue.value : [computedValue.value];
    return (value as ObjectData[]).map((item) => getValue(item));
  });
  // 选中的值
  const selectOptions = computed(() => {
    const optionsMap = new Map(
      [...options.value, ...fallbackOptions.value].map((item) => [
        getValue(item.value),
        item,
      ])
    );
    // 计算input-tag需要显示的值
    return selectValue.value.map((v) => {
      const option = optionsMap.get(v);
      return {
        id: `${v}`,
        label: option
          ? (formatLabel?.(option as SelectOptionData) ?? option?.label)
          : v,
        value: v,
        closeable: option?.tagProps?.closeable,
        tagProps: option?.tagProps,
      };
    });
  });
  // 搜索项
  const isEmpty = computed(() => {
    return options.value.every((item) => {
      return !item.label?.includes(computedInputValue.value);
    });
  });
  // 收集option
  const collectOption = (
    props: Props,
    contentRef: Ref<HTMLDivElement | undefined>
  ) => {
    if (props.isFallbackOption) return;
    const id = nanoid();
    onMounted(() => {
      optionMap.set(id, {
        ...props,
        label: props.label ? props.label : getTextContent(contentRef.value!),
      } as OptionProps);
    });
    onBeforeUnmount(() => {
      optionMap.delete(id);
    });
  };

  return {
    options,
    renderOptions,
    selectOptions,
    isEmpty,
    collectOption,
  };
};
