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
import { isObject, useControlValue } from '@shared/utils';

export const CASCADER_CONTEXT_KEY = 'cascader-context';

export type CascaderContext = {
  computedValue: Ref<CascaderValue>;
  computedInputValue: Ref<string>;
  computedVisible: Ref<boolean>;
  options: Ref<CascaderOptionProps[]>;
  curLevel: Ref<number>;
  curPath: Ref<number[]>;
  pathMode: Ref<boolean>;
  multiple: Ref<boolean>;
  loading: Ref<boolean>;
  slots: Slots;
  expandTrigger: Ref<ExpandTrigger>;
  blur: () => void;
  getValue: (...arg: any) => any;
  emits: CascaderEmits;
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
      options: _options,
    } = toRefs(props as RequiredDeep<CascaderProps>);
    const { formatLabel } = props;
    // 插槽
    const slots = useSlots();
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
    // 选中的option
    const selectOptions = computed(() => {
      const result = options.value.filter((option) => {
        if (pathMode.value) {
          return multiple.value
            ? computedValue.value.find((v: CascaderOptionValue[]) => {
                return (
                  option.nodePath
                    ?.map((item) => getValue(item.value!))
                    ?.join('-') == v.map((item) => getValue(item)).join('-')
                );
              })
            : computedValue.value
                .map((item: CascaderOptionValue) => getValue(item))
                .join('-') ==
                option.nodePath?.map((item) => getValue(item.value!)).join('-');
        } else {
          return multiple.value
            ? computedValue.value.find((v: CascaderOptionValue) => {
                return getValue(option.value!) == getValue(v);
              })
            : getValue(computedValue.value) == getValue(option.value!);
        }
      });
      return result.map((item) => {
        const option = {
          ...item,
          id: item.nodePath?.map((item) => item.index).join('-'),
          label: formatLabel?.(item.nodePath) ?? item.label,
        };
        return option;
      });
    });
    // 当前的层级
    const curLevel = ref<number>(1);
    // 当前的index
    const curPath = ref<number[]>([]);
    // 获取value
    const getValue = (value: CascaderOptionValue) => {
      return isObject(value) ? value[valueKey.value] : value;
    };
    // 失焦
    function blur() {
      inputRef.value?.blur();
    }
    // 提供给子组件
    _provide<CascaderContext>(CASCADER_CONTEXT_KEY, {
      computedValue,
      computedInputValue,
      computedVisible,
      options,
      curLevel,
      curPath,
      expandTrigger,
      pathMode,
      multiple,
      loading,
      slots,
      blur,
      getValue,
      emits,
    });
    return {
      computedValue,
      computedInputValue,
      computedVisible,
      selectOptions,
      curLevel,
      curPath,
      options,
      multiple,
      pathMode,
      disabled,
      allowClear,
      allowSearch,
      searchDelay,
      loading,
      getValue,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<CascaderContext>(CASCADER_CONTEXT_KEY, {
      computedValue: ref(''),
      computedInputValue: ref(''),
      computedVisible: ref(false),
      options: ref([]),
      expandTrigger: ref('click'),
      curLevel: ref(1),
      curPath: ref([]),
      pathMode: ref(false),
      multiple: ref(false),
      loading: ref(false),
      slots: {},
      emits: () => {},
      blur: () => {},
      getValue: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
