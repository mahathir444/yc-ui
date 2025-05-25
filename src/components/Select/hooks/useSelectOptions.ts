import { computed, ref, Ref, onMounted, onUpdated, useSlots } from 'vue';
import { nanoid } from 'nanoid';
import { ObjectData } from '@shared/type';
import {
  OptionProps,
  SelectValue,
  SelectOptions,
  FallbackOption,
  Option,
} from '../index';
import { TriggerInstance } from '@/components/Trigger';
import {
  getTextContent,
  findComponentsFromVnodes,
  isObject,
} from '@shared/utils';

export default (params: {
  fieldKey: Ref<Record<string, string>>;
  selectValue: Ref<ObjectData[]>;
  provideOptions: Ref<SelectOptions>;
  showExtraOptions: Ref<boolean>;
  popupRef: Ref<TriggerInstance | undefined>;
  getValue: (value: string | ObjectData) => SelectValue;
  fallbackOption?: FallbackOption;
}) => {
  const {
    fieldKey,
    selectValue,
    provideOptions,
    showExtraOptions,
    popupRef,
    getValue,
    fallbackOption,
  } = params;
  // 插槽的option无需处理
  const slots = useSlots();
  // optionContent的dom
  const optionContent = ref<Element[]>([]);
  // slot收集的options数组
  const slotOptionData = ref<OptionProps[]>([]);
  // 扁平化的renderOption
  const renderOptionData = computed(() => {
    return provideOptions.value
      .map((item: ObjectData) => {
        return item?.options ?? item;
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
  });
  // fallbackoption
  const fallbackOptionData = computed(() => {
    const optionMap = new Map(
      [...renderOptionData.value, ...slotOptionData.value].map((item) => [
        getValue(item!.value),
        item,
      ])
    );
    return fallbackOption
      ? selectValue.value
          .filter((item) => !optionMap.has(getValue(item)))
          .map((item: SelectValue) => {
            return fallbackOption(item);
          })
      : [];
  });
  // 所有的options
  const options = computed(() => {
    return [
      ...slotOptionData.value,
      ...renderOptionData.value,
      ...fallbackOptionData.value,
    ].map((item, index) => {
      return {
        ...item,
        label: item.label ?? getTextContent(optionContent.value[index]),
      };
    });
  });
  // 渲染的option数组
  const renderOptions = computed<SelectOptions>(() => {
    return [
      ...provideOptions.value,
      ...(showExtraOptions.value ? fallbackOptionData.value : []),
    ].map((item) => {
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
    });
  });
  // 获取选项的props
  const getSlotOptions = () => {
    if (!slots.default) return;
    // 获取option的content
    optionContent.value = Array.from(
      popupRef.value
        ?.getPopupRef()
        ?.querySelectorAll('.yc-select-option-content')
    );
    // 获取插槽的props
    const nodes = findComponentsFromVnodes(
      slots.default?.() ?? [],
      Option.name
    );
    // 处理slotOptionData
    slotOptionData.value = nodes
      .filter((item) => item.props)
      .map((item) => item.props);
  };
  onMounted(() => {
    getSlotOptions();
  });
  return {
    options,
    renderOptions,
  };
};
