import { computed, ref, Ref, onMounted, onUpdated, useSlots, VNode } from 'vue';
import useControlValue from './useControlValue';
import {
  OptionProps,
  SelectValue,
  SelectOptionData,
} from '@/components/Select/type';
import { Fn } from '../_type';
import { isArray } from '../_utils/is';
import { flattedChildren } from '@/components/_utils/vue-vnode';

export default (params: {
  popupVisible: Ref<boolean | undefined>;
  defaultPopupVisible: Ref<boolean>;
  modelValue: Ref<SelectValue | SelectValue[] | undefined>;
  defaultValue: Ref<SelectValue | SelectValue[]>;
  inputValue: Ref<string | undefined>;
  defaultInputValue: Ref<string>;
  _options: Ref<SelectOptionData[]>;
  formatLabel: Fn;
  emits: Fn;
}) => {
  const {
    popupVisible,
    defaultPopupVisible,
    modelValue,
    defaultValue,
    inputValue,
    defaultInputValue,
    _options,
    formatLabel,
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
  // 当前选项
  const computedValue = useControlValue<SelectValue | SelectValue[]>(
    modelValue,
    defaultValue.value,
    (val) => {
      emits('change', val);
      emits('update:modelValue', val);
    }
  );
  // 当前的选项显示ide值
  const computedLabel = computed(() => {
    const option = options.value.filter((item) => {
      return isArray(computedValue.value)
        ? computedValue.value.includes(item.value)
        : computedValue.value == item.value;
    });
    if (!option.length) return '';
    return formatLabel(option[0]);
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
  const options = ref<OptionProps[]>([]);
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
    options.value = (propsArray as Record<string, any>[])
      .filter((vnode) => vnode?.type?.name == 'Option' && vnode?.props)
      .map((vnode) => vnode?.props as OptionProps);
    options.value = [...options.value, ..._options.value];
  };
  onMounted(() => {
    getOptions();
  });
  onUpdated(() => {
    getOptions();
  });
  return {
    options,
    computedVisible,
    computedValue,
    computedInputValue,
    computedLabel,
    isEmpty,
  };
};
