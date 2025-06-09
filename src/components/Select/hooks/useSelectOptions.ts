import { computed, Ref, onMounted, reactive, onBeforeUnmount } from 'vue';
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
import { getDomText, isObject } from '@shared/utils';

export default (params: {
  multiple: Ref<boolean>;
  computedValue: Ref<SelectValue>;
  computedInputValue: Ref<string>;
  provideOptions: Ref<SelectOptions>;
  showExtraOptions: Ref<boolean>;
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
      .filter((v) => !valueMap.get(v))
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
      let option = item;
      if (!isObject(item)) {
        option = {
          label: item,
          value: item,
        };
      }
      return {
        id: nanoid(),
        ...(option as ObjectData),
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
    // 组件inputMap
    const valueMap = new Map(
      [...options.value, ...fallbackOptions.value].map((item) => [
        getValue(item.value),
        item,
      ])
    );
    // 计算input-tag需要显示的值
    return selectValue.value.map((v) => {
      const option = (valueMap.get(v) || {}) as SelectOptionData;
      return {
        ...option,
        id: `${v}`,
        label: option ? (formatLabel?.(option) ?? option?.label) : v,
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
    // 挂载的时候收集option
    onMounted(() => {
      optionMap.set(id, {
        ...props,
        label: props.label ? props.label : getDomText(contentRef),
      } as OptionProps);
    });
    // 卸载的时候卸载option
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
