import {
  ref,
  toRefs,
  Ref,
  provide as _provide,
  inject as _inject,
  computed,
  useSlots,
  Slots,
} from 'vue';
import { Props, RequiredDeep } from '@shared/type';
import {
  CascaderEmits,
  CascaderProps,
  CascaderValue,
  CascaderOption,
  CascaderOptionValue,
  CascaderOptionProps,
  ExpandTrigger,
} from '../type';
import { InputInstance } from '@/components/Input';
import {
  isObject,
  useControlValue,
  isArray,
  isBoolean,
  isFunction,
} from '@shared/utils';

export const CASCADER_CONTEXT_KEY = 'cascader-context';

export type CascaderContext = {
  computedValue: Ref<CascaderValue>;
  computedInputValue: Ref<string>;
  options: Ref<CascaderOptionProps[]>;
  searchOptions: Ref<CascaderOptionProps[]>;
  curLevel: Ref<number>;
  curPath: Ref<number[]>;
  pathMode: Ref<boolean>;
  multiple: Ref<boolean>;
  loading: Ref<boolean>;
  expandTrigger: Ref<ExpandTrigger>;
  expandChild: Ref<boolean>;
  searchOptionOnlyLabel: Ref<boolean>;
  slots: Slots;
  blur: () => void;
  getValueKey: (...arg: any) => any;
  getOption: (
    value: CascaderOptionValue | CascaderOptionValue[]
  ) => CascaderOptionProps;
};

// 增强option添加indexPath,valuePath,level,labelPath
export function transformOptions(
  options: CascaderOption[],
  level: number = 1,
  nodePath: CascaderOption[] = []
): CascaderOptionProps[] {
  return options.map((option, index) => {
    // 构建baseOption
    const baseOption = {
      ...option,
      index,
      level,
    };
    // 构建path
    const curNodePath = [...nodePath, baseOption];
    // 构建option
    const enhancedOption: CascaderOptionProps = {
      ...baseOption,
      nodePath: curNodePath,
    };
    // 递归处理子节点
    if (enhancedOption.children && enhancedOption.children.length > 0) {
      enhancedOption.children = transformOptions(
        enhancedOption.children,
        level + 1,
        curNodePath
      );
    }
    return enhancedOption;
  });
}
// 扁平化options
export function flattenOptions(options: CascaderOptionProps[]) {
  const result: CascaderOptionProps[] = [];
  const traverse = (options: CascaderOptionProps[]) => {
    options.forEach((option) => {
      // 添加当前节点到结果数组
      result.push(option);
      // 递归处理子节点
      if (option.children && option.children.length > 0) {
        traverse(option.children);
      }
    });
  };
  traverse(options);
  return result;
}
// 基于当前的level和父级path查找options
export const findOptions = (
  options: CascaderOptionProps[],
  level: number,
  parentPath: number[]
) => {
  return level == 1
    ? options.filter((item) => item.level == level)
    : options.filter((v) => {
        return (
          v.level == level &&
          v.nodePath
            ?.slice(0, v.nodePath.length - 1)
            .map((item) => item.index)
            .join('') == parentPath.join('')
        );
      });
};
// 获取所有的子夜节点
export function getLeafNodes(nodes: CascaderOptionProps[]) {
  const leafNodes: CascaderOptionProps[] = [];
  function traverse(currentNode: CascaderOptionProps) {
    if (!currentNode.children || currentNode.children.length === 0) {
      // 没有子节点，是叶子节点
      leafNodes.push(currentNode);
      return;
    }
    // 有子节点，继续递归遍历
    currentNode.children.forEach((child) => traverse(child));
  }
  // 遍历传入的每个节点
  nodes.forEach((node) => traverse(node));
  return leafNodes;
}

export default () => {
  const provide = (
    props: Props,
    emits: CascaderEmits,
    inputRef: Ref<InputInstance | undefined>
  ) => {
    const {
      modelValue,
      defaultValue,
      inputValue,
      defaultInputValue,
      popupVisible,
      defaultPopupVisible,
      pathMode,
      searchDelay,
      multiple,
      disabled,
      allowClear,
      allowSearch,
      loading,
      fieldNames,
      valueKey,
      expandTrigger,
      expandChild,
      searchOptionOnlyLabel,
      options: _options,
    } = toRefs(props as RequiredDeep<CascaderProps>);
    const { formatLabel, fallback, filterOption } =
      props as RequiredDeep<CascaderProps>;
    // 受控的值
    const computedValue = useControlValue<CascaderValue>(
      modelValue,
      defaultValue.value,
      (val) => {
        emits('update:modelValue', val);
        emits('change', val);
      }
    );
    // 受控的输入
    const computedInputValue = useControlValue<string>(
      inputValue,
      defaultInputValue.value,
      (val) => {
        emits('update:inputValue', val);
        emits('input-value-change', val);
      }
    );
    // 受控的可见性
    const computedVisible = useControlValue<boolean>(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits('update:popupVisible', val);
        emits('popup-visible-change', val);
      }
    );
    // options
    const options = computed(() => {
      // 转换fieldKeys
      const keys = [
        'label',
        'value',
        'render',
        'disabled',
        'tagProps',
        'children',
        'isLeaf',
      ];
      // 转换字段
      const fieldKeys = Object.fromEntries(
        keys.map((key) => [key, fieldNames.value?.[key] ?? key])
      ) as Record<string, string>;
      // 转换option的字段
      const tempOptions = _options.value.map((item) => {
        return Object.fromEntries(
          keys.map((key) => [
            key,
            (item as Record<string, string>)[fieldKeys[key]],
          ])
        );
      });
      // 转换options
      return flattenOptions(transformOptions(tempOptions));
    });
    // optionMap
    const optionMap = computed(() => {
      return Object.fromEntries([
        ...options.value.map((item) => {
          return [getValueKey(item.nodePath!.map((item) => item.value!)), item];
        }),
        ...options.value.map((item) => {
          return [getValueKey(item), item];
        }),
      ]);
    });
    // 子叶option
    const leafOptions = computed(() => {
      return options.value.filter((option) => !option.children?.length);
    });
    // 搜索options
    const searchOptions = computed(() => {
      return leafOptions.value.filter((item) =>
        filterOption(computedInputValue.value, item)
      );
    });
    // 选中的option
    const selectOptions = computed(() => {
      const value = multiple.value
        ? computedValue.value
        : [computedValue.value];
      return value
        .map((v: CascaderOptionValue[]) => {
          const option = getOption(v);
          if (option) {
            return {
              ...option,
              id: option.nodePath?.map((v1) => v1.index).join('-'),
              label:
                formatLabel?.(option.nodePath!) ??
                (multiple.value
                  ? option.nodePath?.map((v1) => v1.label).join(' / ')
                  : option.label),
            };
          }
          if ((isBoolean(fallback) && fallback) || isFunction(fallback)) {
            return {
              id: getValueKey(v),
              label: isFunction(fallback) ? fallback(v) : getValueKey(v),
              value: getValueKey(v),
            };
          }
          return null;
        })
        .filter((v: CascaderOptionProps) => v);
    });
    // 当前的层级
    const curLevel = ref<number>(1);
    // 当前的index
    const curPath = ref<number[]>([]);
    // 插槽
    const slots = useSlots();
    // 获取value
    const getValue = (value: CascaderOptionValue) => {
      return isObject(value) ? value[valueKey.value] : value;
    };
    // 获取valueKey
    const getValueKey = (
      value: CascaderOptionValue | CascaderOptionValue[]
    ) => {
      return isArray(value)
        ? value.map((v) => getValue(v as CascaderOptionValue)).join(' / ')
        : (getValue(value) as string);
    };
    // 获取option
    const getOption = (value: CascaderOptionValue | CascaderOptionValue[]) => {
      return optionMap.value[getValueKey(value)] as CascaderOptionProps;
    };
    // 失焦
    function blur() {
      inputRef.value?.blur();
    }
    // 提供给子组件
    _provide<CascaderContext>(CASCADER_CONTEXT_KEY, {
      computedValue,
      computedInputValue,
      options,
      searchOptions,
      curLevel,
      curPath,
      expandTrigger,
      expandChild,
      pathMode,
      multiple,
      loading,
      searchOptionOnlyLabel,
      slots,
      blur,
      getValueKey,
      getOption,
    });
    return {
      computedValue,
      computedInputValue,
      computedVisible,
      options,
      optionMap,
      selectOptions,
      curLevel,
      curPath,
      multiple,
      pathMode,
      disabled,
      allowClear,
      allowSearch,
      searchDelay,
      loading,
      getValue,
      getValueKey,
      getOption,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<CascaderContext>(CASCADER_CONTEXT_KEY, {
      computedValue: ref(''),
      computedInputValue: ref(''),
      options: ref([]),
      searchOptions: ref([]),
      expandTrigger: ref('click'),
      expandChild: ref(false),
      curLevel: ref(1),
      curPath: ref([]),
      pathMode: ref(false),
      multiple: ref(false),
      loading: ref(false),
      searchOptionOnlyLabel: ref(false),
      slots: {},
      blur: () => {},
      getValueKey: () => {},
      getOption: (_) => {
        return {};
      },
    });
  };
  return {
    provide,
    inject,
  };
};
