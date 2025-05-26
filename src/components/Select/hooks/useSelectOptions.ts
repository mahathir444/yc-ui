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
  // 值map
  const valueMap = computed(
    () => new Map(options.value.map((item) => [getValue(item.value), item]))
  );
  // fallbackoption
  const fallbackOptions = computed(() => {
    return fallbackOption
      ? selectValue.value
          .filter((v) => valueMap.value.get(v))
          .map((v: SelectValue) => fallbackOption(v))
      : [];
  });
  // 渲染的option数组
  const renderOptions = computed<SelectOptions>(() => {
    return provideOptions.value.map((item) => {
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
    // 计算input-tag需要显示的值
    return selectValue.value.map((v) => {
      const option = valueMap.value.get(v);
      return {
        id: `${v}`,
        label: formatLabel
          ? formatLabel(option as SelectOptionData)
          : option?.label,
        value: v,
        closeable: option?.tagProps?.closeable,
        tagProps: option?.tagProps,
      };
    });
  });
  // 收集option
  const collectOption = (
    props: Props,
    contentRef: Ref<HTMLDivElement | undefined>
  ) => {
    const id = nanoid();
    onMounted(() => {
      optionMap.set(id, {
        ...props,
        label: props.label ? props.label : getTextContent(contentRef.value!),
      } as OptionProps);
    });
    onUpdated(() => {
      const target = optionMap.get(id);
      if (props.label || !target) return;
      const label = getTextContent(contentRef.value!);
      target.label = label;
    });
    onBeforeUnmount(() => {
      optionMap.delete(id);
    });
  };

  return {
    options,
    renderOptions,
    fallbackOptions,
    selectOptions,
    collectOption,
  };
};
