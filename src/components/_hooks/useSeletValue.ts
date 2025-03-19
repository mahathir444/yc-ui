import { computed, ref, Ref, onMounted, onUpdated, useSlots, VNode } from 'vue';
import useControlValue from './useControlValue';
import {
  OptionProps,
  SelectValue,
  SelectOptions,
} from '@/components/Select/type';
import { TagData } from '@/components/InputTag';
import { Fn, ObjectData } from '../_type';
import { flattedChildren } from '@/components/_utils/vue-vnode';
import { nanoid } from 'nanoid';
import { isObject } from '../_utils/is';

export default (params: {
  popupVisible: Ref<boolean | undefined>;
  defaultPopupVisible: Ref<boolean>;
  modelValue: Ref<SelectValue | undefined>;
  defaultValue: Ref<SelectValue>;
  inputValue: Ref<string | undefined>;
  defaultInputValue: Ref<string>;
  multiple: Ref<boolean>;
  fieldNames: Ref<Record<string, string>>;
  _options: Ref<SelectOptions>;
  formatLabel: Fn | undefined;
  emits: Fn;
  getValue: Fn;
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
    _options,
    formatLabel,
    emits,
    getValue,
  } = params;
  // fieldKey
  const fieldKey = computed(() => {
    return {
      label: fieldNames.value['label'] ?? 'label',
      value: fieldNames.value['value'] ?? 'value',
      disabled: fieldNames.value['disabled'] ?? 'disabled',
      tagProps: fieldNames.value['tagProps'] ?? 'tagProps',
    };
  });
  // popupVisible
  const computedVisible = useControlValue<boolean>(
    popupVisible,
    defaultPopupVisible.value,
    (val) => {
      emits('update:popupVisible', val);
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
  // 选中的值
  const selectOptions = computed(() => {
    // 扁平化值
    const selectValue = multiple.value
      ? computedValue.value
      : [computedValue.value];
    // 创建optionMap
    const optionMap = new Map(
      options.value.map((item) => [getValue(item.value), item])
    );
    // 计算input-tag需要显示的值
    return (selectValue as ObjectData[]).map((v) => {
      const option = optionMap.get(getValue(v));
      return {
        id: nanoid(),
        label: formatLabel ? formatLabel(option) : option?.label,
        value: v,
        closeable: option?.tagProps?.closeable,
        tagProps: option?.tagProps,
      };
    }) as TagData[];
  });
  // 输入框的值
  const computedInputValue = useControlValue<string>(
    inputValue,
    defaultInputValue.value,
    (val) => {
      emits('update:inputValue', val);
    }
  );
  // slot收集的options数组
  const slotOptions = ref<OptionProps[]>([]);
  // 传入的option数组
  const renderOptions = computed(() =>
    _options.value.map((item) => {
      return isObject(item)
        ? {
            id: nanoid(),
            ...item,
          }
        : {
            id: nanoid(),
            label: item,
            value: item,
          };
    })
  );
  // 合并所有的选项
  const options = computed(() => {
    // 传入的_options转换字段
    const flattOptions = _options.value
      .map((item: ObjectData) => {
        return item?.options ? item.options : item;
      })
      .flat(1)
      .map((item) => {
        const newEntries = Object.entries(fieldKey.value).map(
          ([oldKey, newKey]) => {
            return [oldKey, (item as ObjectData)[newKey]];
          }
        );
        return Object.fromEntries(newEntries);
      });
    return [...slotOptions.value, ...flattOptions];
  });
  // 搜索项
  const isEmpty = computed(() => {
    const filterResult = options.value.filter((item) =>
      item.label?.includes(computedInputValue.value)
    );
    return !filterResult.length;
  });
  // 获取选项的props
  const getOptions = () => {
    // 插槽的option无需处理
    const slots = useSlots();
    const propsArray = flattedChildren(slots?.default?.() ?? []);
    slotOptions.value = (propsArray as ObjectData[])
      .filter((vnode) => vnode?.type?.name == 'Option' && vnode?.props)
      .map((vnode) => vnode?.props as OptionProps);
  };
  onMounted(() => {
    getOptions();
  });
  onUpdated(() => {
    getOptions();
  });
  return {
    options,
    renderOptions,
    fieldKey,
    computedVisible,
    computedValue,
    computedInputValue,
    selectOptions,
    isEmpty,
  };
};
