import {
  ref,
  computed,
  toRefs,
  WritableComputedRef,
  Ref,
  provide as _provide,
  inject as _inject,
  Reactive,
} from 'vue';
import {
  SelectValue,
  SelectOptionData,
  FilterOption,
  SelectEmits,
  SelectProps,
} from '../type';
import { ObjectData, RequiredDeep } from '@shared/type';
import { useControlValue } from '@shared/hooks';
import { TriggerInstance } from '@/components/Trigger';
import { InputInstance } from '@/components/Input';
import useSelectOptions from './useSelectOptions';
import useSelectHotkeys from './useSelectHotkeys';
export interface SelectProvide {
  computedValue:
    | WritableComputedRef<SelectValue | SelectValue[]>
    | Ref<undefined>;
  computedInputValue: WritableComputedRef<string> | Ref<string>;
  multiple: Ref<boolean>;
  limit: Ref<number>;
  curIndex: Ref<number>;
  options: Ref<SelectOptionData[]>;
  blur: () => void;
  filterOption: FilterOption;
  getValue: (value: SelectValue | ObjectData) => SelectValue;
  emits: SelectEmits;
}

type Props = Reactive<Record<string, any>>;

type SelectPropsRequired = RequiredDeep<SelectProps>;

export const SELECT_PROVIDE_KEY = 'select-props';

export default () => {
  const provide = (
    props: Props,
    emits: SelectEmits,
    refs: {
      popupRef: Ref<TriggerInstance | undefined>;
      inputRef: Ref<InputInstance | undefined>;
    }
  ) => {
    const {
      popupVisible,
      defaultPopupVisible,
      modelValue,
      defaultValue,
      inputValue,
      defaultInputValue,
      multiple,
      fieldNames,
      limit,
      showExtraOptions,
      valueKey,
      hotkeys,
      options: provideOptions,
    } = toRefs(props as SelectPropsRequired);
    const { formatLabel, fallbackOption, filterOption } =
      props as SelectPropsRequired;
    const { popupRef, inputRef } = refs;
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
    // 初始化快捷键
    const { curIndex } = useSelectHotkeys({
      computedValue,
      computedVisible,
      hotkeys,
      limit,
      multiple,
      options,
      blur,
      emits,
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
    function getValue(value: SelectValue) {
      return (value as ObjectData)?.[valueKey.value] ?? value;
    }
    function blur() {
      inputRef.value.blur();
    }
    _provide<SelectProvide>(SELECT_PROVIDE_KEY, {
      computedValue,
      computedInputValue,
      limit,
      multiple,
      curIndex,
      options,
      filterOption,
      blur,
      getValue,
      emits,
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
  const inject = () => {
    return _inject<SelectProvide>(SELECT_PROVIDE_KEY, {
      computedValue: ref(undefined),
      computedInputValue: ref(''),
      multiple: ref(false),
      limit: ref(0),
      curIndex: ref(-1),
      options: ref([]),
      blur: () => {},
      filterOption: () => true,
      getValue: () => '',
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
