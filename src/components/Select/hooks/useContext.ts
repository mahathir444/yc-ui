import {
  ref,
  computed,
  toRefs,
  Ref,
  provide as _provide,
  inject as _inject,
  useSlots,
  Slots,
} from 'vue';
import {
  SelectValue,
  SelectOptionData,
  FilterOption,
  SelectEmits,
  SelectProps as _SelectProps,
} from '../type';
import { ObjectData, RequiredDeep, Props } from '@shared/type';
import { TriggerInstance } from '@/components/Trigger';
import { InputInstance } from '@/components/Input';
import { useControlValue } from '@shared/utils';
import useSelectOptions from './useSelectOptions';
import useSelectHotkeys from './useSelectHotkeys';

export const SELECT_PROVIDE_KEY = 'select-context';

export interface SelectContext {
  computedValue: Ref<SelectValue | SelectValue[] | undefined>;
  computedInputValue: Ref<string>;
  multiple: Ref<boolean>;
  limit: Ref<number>;
  curIndex: Ref<number>;
  options: Ref<SelectOptionData[]>;
  renderOptions: Ref<ObjectData[]>;
  fieldKey: Ref<Record<string, string>>;
  isEmpty: Ref<boolean>;
  slots: Slots;
  blur: () => void;
  filterOption: FilterOption;
  getValue: (value: SelectValue | ObjectData) => SelectValue;
  emits: SelectEmits;
  collectOption: (
    props: Props,
    titleRef: Ref<HTMLDivElement | undefined>
  ) => void;
}

type SelectProps = RequiredDeep<_SelectProps>;

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
    } = toRefs(props as SelectProps);
    const { formatLabel, fallbackOption, filterOption } = props as SelectProps;
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
    // 获取选项的值
    const { options, renderOptions, selectOptions, isEmpty, collectOption } =
      useSelectOptions({
        computedValue,
        computedInputValue,
        multiple,
        popupRef,
        fieldKey,
        showExtraOptions,
        provideOptions,
        getValue,
        fallbackOption,
        formatLabel,
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

    // 获取value
    function getValue(value: SelectValue) {
      return (value as ObjectData)?.[valueKey.value] ?? value;
    }
    // 失焦
    function blur() {
      inputRef.value.blur();
    }
    // 提供值
    _provide<SelectContext>(SELECT_PROVIDE_KEY, {
      computedValue,
      computedInputValue,
      limit,
      multiple,
      curIndex,
      options,
      isEmpty,
      fieldKey,
      renderOptions,
      slots: useSlots(),
      filterOption,
      blur,
      getValue,
      emits,
      collectOption,
    });
    return {
      computedVisible,
      computedValue,
      computedInputValue,
      selectOptions,
      options,
    };
  };
  const inject = () => {
    return _inject<SelectContext>(SELECT_PROVIDE_KEY, {
      computedValue: ref(undefined),
      computedInputValue: ref(''),
      multiple: ref(false),
      limit: ref(0),
      curIndex: ref(-1),
      options: ref([]),
      renderOptions: ref([]),
      isEmpty: ref(false),
      fieldKey: ref({}),
      slots: {},
      blur: () => {},
      filterOption: () => true,
      getValue: () => '',
      emits: () => {},
      collectOption: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
