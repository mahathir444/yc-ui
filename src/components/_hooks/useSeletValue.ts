import { computed, ref, Ref, onMounted, onUpdated, useSlots, VNode } from 'vue';
import useControlValue from './useControlValue';
import {
  OptionProps,
  SelectValue,
  SelectOptionData,
} from '@/components/Select/type';
import { TagData } from '@/components/InputTag';
import { Fn, ObjectData } from '../_type';
import { flattedChildren } from '@/components/_utils/vue-vnode';
import { nanoid } from 'nanoid';

export default (params: {
  popupVisible: Ref<boolean | undefined>;
  defaultPopupVisible: Ref<boolean>;
  modelValue: Ref<SelectValue | SelectValue[] | undefined>;
  defaultValue: Ref<SelectValue | SelectValue[]>;
  inputValue: Ref<string | undefined>;
  defaultInputValue: Ref<string>;
  multiple: Ref<boolean>;
  fieldNames: Ref<Record<string, string>>;
  _options: Ref<SelectOptionData[]>;
  formatLabel: Fn | undefined;
  emits: Fn;
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
  const computedValue = useControlValue<SelectValue | SelectValue[]>(
    modelValue,
    defaultValue.value,
    (val) => {
      emits('change', val);
      emits('update:modelValue', val);
    }
  );
  //展示的值
  const showValue = computed(() => {
    const selectValue = multiple.value
      ? computedValue.value
      : [computedValue.value];
    return (selectValue as any[]).map((item) => {
      const option = optionMap.value[item];
      return {
        id: nanoid(),
        label: formatLabel ? formatLabel(option) : option?.label,
        value: item,
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
  // options数组
  const options = ref<SelectOptionData[]>([]);
  // optionMap
  const optionMap = computed(() => {
    return Object.fromEntries(options.value.map((item) => [item.value, item]));
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
    const slots = useSlots();
    const propsArray = flattedChildren(slots?.default?.() ?? []);
    options.value = (propsArray as ObjectData[])
      .filter((vnode) => vnode?.type?.name == 'Option' && vnode?.props)
      .map((vnode) => vnode?.props as OptionProps);
    // ..._options.value.map(item => {
    //   Object.keys(item).map(key=>{

    //   })
    // })
    options.value = [...options.value];
  };
  onMounted(() => {
    getOptions();
  });
  onUpdated(() => {
    getOptions();
  });
  return {
    fieldKey,
    options,
    computedVisible,
    computedValue,
    computedInputValue,
    showValue,
    isEmpty,
  };
};
