import {
  computed,
  ref,
  Ref,
  onMounted,
  onUpdated,
  useSlots,
  ComputedRef,
  VNode,
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
  // 所有的options
  const options = computed(() => {
    return [
      ...slotOptions.value,
      ...flattedRenderOption.value,
      ...fallbackOptions.value,
    ];
  });
  // 是否是option
  const isOption = (vnode: ObjectData) => vnode.type.name == Option.name;
  // 是否是optgroup
  const isOptgroup = (vnode: ObjectData) => vnode.type.name == Optgroup.name;
  // 扁平化children
  const flattedChildren = (vnode: ObjectData) => {
    if (isOption(vnode)) return vnode;
    const groupChildren = vnode.children.default?.() || [];
    return (groupChildren as ObjectData[]).map((item) => item.children);
  };
  // 获取选项的props
  const getOptions = () => {
    slotOptions.value = (slots?.default?.() ?? [])
      .filter((vnode) => isOption(vnode) || isOptgroup(vnode))
      .map((vnode) => flattedChildren(vnode))
      .flat(Infinity)
      .filter((vnode) => vnode.props)
      .map((vnode) => vnode.props);
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
