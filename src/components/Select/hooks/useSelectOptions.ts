import {
  computed,
  Ref,
  onMounted,
  onUpdated,
  reactive,
  toRefs,
  onBeforeUnmount,
  useSlots,
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
} from '../type';
import { TriggerInstance } from '@/components/Trigger';
import {
  getTextContent,
  isObject,
  findComponentsFromVnodes,
} from '@shared/utils';
import Option from '../Option.vue';

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
        label: formatLabel
          ? formatLabel(option as SelectOptionData)
          : option?.label,
        value: v,
        closeable: option?.tagProps?.closeable,
        tagProps: option?.tagProps,
      };
    });
  });

  return {
    options,
    renderOptions,
    selectOptions,
  };
};
