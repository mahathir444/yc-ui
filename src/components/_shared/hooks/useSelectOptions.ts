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
} from '@/components/Select';
import { Fn, ObjectData } from '../type';
import { flattedChildren } from '../utils/vue-vnode';
import { isObject } from '../utils/is';
export default (params: {
  fieldKey: ComputedRef<Record<string, string>>;
  selectValue: ComputedRef<ObjectData[]>;
  provideOptions: Ref<SelectOptions>;
  showExtraOptions: Ref<boolean>;
  getValue: Fn;
  fallbackOption?: FallbackOption;
}) => {
  const {
    fieldKey,
    selectValue,
    provideOptions,
    showExtraOptions,
    getValue,
    fallbackOption,
  } = params;
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
  // 所有的options
  const options = computed(() => {
    return [
      ...slotOptions.value,
      ...flattedRenderOption.value,
      ...fallbackOptions.value,
    ];
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
  };
};
