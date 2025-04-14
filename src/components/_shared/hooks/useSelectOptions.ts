import {
  computed,
  ref,
  Ref,
  onMounted,
  onUpdated,
  useSlots,
  ComputedRef,
} from 'vue';
import { nanoid } from 'nanoid';
import {
  OptionProps,
  SelectValue,
  SelectOptions,
  FallbackOption,
  Optgroup,
  Option,
} from '@/components/Select';
import { Fn, ObjectData } from '../type';
import { isObject } from '../utils/is';
import { TriggerInstance } from '@/components/Trigger';
import { getTextContent } from '../utils/dom';
import { flattenAndFindOptions } from '../utils/vue-vnode';

export default (params: {
  fieldKey: ComputedRef<Record<string, string>>;
  selectValue: ComputedRef<ObjectData[]>;
  provideOptions: Ref<SelectOptions>;
  showExtraOptions: Ref<boolean>;
  popupRef: Ref<TriggerInstance | undefined>;
  getValue: Fn;
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
  // slot收集的options数组
  const slotOptions = ref<OptionProps[]>([]);
  // 扁平化的renderOption
  const flattedRenderOption = computed(() => {
    return provideOptions.value
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
  });
  // fallbackoption
  const fallbackOptions = computed(() => {
    const optionMap = new Map(
      [...flattedRenderOption.value, ...slotOptions.value].map((item) => [
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
  // 渲染的option数组
  const renderOptions = computed(() => {
    return [
      ...provideOptions.value,
      ...(showExtraOptions.value ? fallbackOptions.value : []),
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
  // optionContent内容
  const optionContent = ref<string[]>([]);
  // 所有的options
  const options = computed(() => {
    const result = [
      ...slotOptions.value,
      ...flattedRenderOption.value,
      ...fallbackOptions.value,
    ].map((item, index) => {
      return {
        ...item,
        label: item.label ?? optionContent.value[index] ?? '',
      };
    });
    return result;
  });
  // 获取选项的props
  const getOptions = () => {
    if (!slots.default) return;
    // document;
    const popupContainer = popupRef.value
      ?.getPopupRef()
      ?.getRef() as HTMLDivElement;
    // 获取option的content
    optionContent.value = Array.from(
      popupContainer.querySelectorAll('.yc-select-option-content')
    ).map((dom) => getTextContent(dom));
    // 获取插槽
    slotOptions.value = flattenAndFindOptions(slots?.default?.() ?? [])
      .filter((vnode) => vnode.props)
      .map((vnode) => vnode.props);
    console.log(slotOptions.value, 'slotOptions');
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
  };
};
