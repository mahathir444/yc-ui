import { ref, computed, Ref, useSlots, watch, nextTick } from 'vue';
import { nanoid } from 'nanoid';
import { ObjectData } from '@shared/type';
import {
  SelectValue,
  SelectOptions,
  FallbackOption,
  FormatLabel,
  SelectOptionData,
} from '../type';
import { TriggerInstance } from '@/components/Trigger';
import {
  getTextContent,
  isObject,
  findComponentsFromVnodes,
} from '@shared/utils';
import Option from '../Option.vue';

export default (params: {
  computedValue: Ref<SelectValue>;
  computedInputValue: Ref<string>;
  fieldKey: Ref<Record<string, string>>;
  provideOptions: Ref<SelectOptions>;
  showExtraOptions: Ref<boolean>;
  popupRef: Ref<TriggerInstance | undefined>;
  multiple: Ref<boolean>;
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
  // 获取插槽选项
  const slots = useSlots();
  const slotsOptions = computed(() => {
    const nodes = findComponentsFromVnodes(
      slots.default?.() || [],
      Option.name as string
    );
    return nodes.map((item) => {
      return {
        label: '',
        value: '',
        disabled: false,
        isFallbackOption: false,
        ...(item.props || {}),
      };
    });
  });
  // fallbackoption
  const fallbackOptions = computed(() => {
    if (!fallbackOption) return [];
    const valueMap = new Map(
      [...slotsOptions.value, ...provideOptions.value].map((item) => [
        getValue(item.value),
        item,
      ])
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
  // 所有的options
  const options = computed(() => [
    ...slotsOptions.value,
    ...renderOptions.value,
  ]);
  const optionContent = ref<HTMLDivElement[]>([]);
  // 选中的value
  const selectValue = computed(() => {
    const value = multiple.value ? computedValue.value : [computedValue.value];
    return (value as ObjectData[]).map((item) => getValue(item));
  });
  // 选中的值
  const selectOptions = computed(() => {
    const optionsMap = new Map(
      options.value.map((item) => [getValue(item.value), item])
    );
    // 计算input-tag需要显示的值
    return selectValue.value.map((v) => {
      const option = optionsMap.get(v);
      return {
        id: `${v}`,
        label: option ? calcLabel(option) : v,
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
  // 获取dom
  watch(
    () => options.value.length,
    async () => {
      await nextTick();
      optionContent.value = [
        ...document.querySelectorAll('[data-select-option="true"]'),
      ] as HTMLDivElement[];
    },
    {
      immediate: true,
    }
  );
  // 计算label
  function calcLabel(option: SelectOptionData) {
    const { label, value } = option;
    if (formatLabel || label) {
      return formatLabel?.(option) ?? label;
    }
    const target = optionContent.value.find((item) => {
      const { value: _value } = JSON.parse(
        item.getAttribute('data-select-option-value') || ''
      );
      return value == _value;
    });
    return getTextContent(target as HTMLDivElement);
  }
  return {
    slots,
    options,
    renderOptions,
    selectOptions,
    isEmpty,
  };
};
