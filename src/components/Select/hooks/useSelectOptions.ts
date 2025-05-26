import {
  computed,
  Ref,
  onMounted,
  onUpdated,
  reactive,
  toRefs,
  onBeforeUnmount,
} from 'vue';
import { nanoid } from 'nanoid';
import { ObjectData, Props } from '@shared/type';
import {
  OptionProps,
  SelectValue,
  SelectOptions,
  FallbackOption,
} from '../index';
import { TriggerInstance } from '@/components/Trigger';
import { getTextContent, isObject } from '@shared/utils';

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
    getValue,
    fallbackOption,
  } = params;
  // optionMap
  const optionMap = reactive<Map<string, ObjectData>>(new Map());
  // 所有的options
  const options = computed(() => [...optionMap.values()]);
  // fallbackoption
  // const fallbackOptions = computed(() => {
  //   const optionMap = new Map(
  //     options.value.map((item) => [getValue(item!.value), item])
  //   );
  //   return fallbackOption
  //     ? selectValue.value
  //         .filter((item) => !optionMap.has(getValue(item)))
  //         .map((item: SelectValue) => {
  //           return fallbackOption(item);
  //         })
  //     : [];
  // });
  // 渲染的option数组
  const renderOptions = computed<SelectOptions>(() => {
    return [
      ...provideOptions.value,
      // ...(showExtraOptions.value ? fallbackOptions.value : []),
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
  // 收集option
  const collectOption = (
    props: Props,
    contentRef: Ref<HTMLDivElement | undefined>
  ) => {
    const id = nanoid();
    onMounted(() => {
      optionMap.set(id, {
        ...props,
        label: props.label ? props.label : getTextContent(contentRef.value!),
      } as OptionProps);
    });
    onBeforeUnmount(() => {
      optionMap.delete(id);
    });
  };

  return {
    options,
    renderOptions,
    collectOption,
  };
};
