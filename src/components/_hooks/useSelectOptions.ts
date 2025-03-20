import {
  computed,
  ref,
  Ref,
  onMounted,
  onUpdated,
  useSlots,
  ComputedRef,
} from 'vue';
import {
  OptionProps,
  SelectValue,
  SelectOptions,
  FallbackOption,
} from '@/components/Select';
import { ObjectData } from '../_type';
import { flattedChildren } from '@/components/_utils/vue-vnode';
import { isObject } from '../_utils/is';
import { nanoid } from 'nanoid';
export default (params: {
  fieldKey: ComputedRef<Record<string, string>>;
  selectValue: ComputedRef<ObjectData[]>;
  provideOptions: Ref<SelectOptions>;
  showExtraOptions: Ref<boolean>;
  fallbackOption?: FallbackOption;
}) => {
  const {
    fieldKey,
    selectValue,
    provideOptions,
    showExtraOptions,
    fallbackOption,
  } = params;
  // slot收集的options数组
  const slotOptions = ref<OptionProps[]>([]);
  // fallbackoption
  const fallbackOptions = computed(() => {
    return fallbackOption
      ? selectValue.value.map((item: SelectValue) => {
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
    // 传入的_options转换字段
    const flattOptions = provideOptions.value
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
    return [...slotOptions.value, ...flattOptions, ...fallbackOptions.value];
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
