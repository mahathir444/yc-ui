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
} from '../type';
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
  slots: Slots;
  getValue: (...arg: any) => any;
  emits: CascaderEmits;
};

// 增强option添加indexPath,valuePath,level,labelPath
export function enhanceCascaderOptions(
  options: CascaderOption[],
  startLevel: number = 1,
  parentIndices: number[] = [],
  parentValuePath: Array<string | number | Record<string, any>> = [],
  parentLabelPath: string[] = []
): CascaderOptionProps[] {
  return options.map((option, currentIndex) => {
    // 当前节点的索引路径
    const currentIndexPath = [...parentIndices, currentIndex];
    // 当前节点的value路径
    const currentValuePath = [...parentValuePath];
    if (option.value !== undefined) {
      currentValuePath.push(option.value);
    }
    // 当前节点的label路径
    const currentLabelPath = [...parentLabelPath];
    if (option.label !== undefined) {
      currentLabelPath.push(option.label);
    }
    // 创建增强后的选项
    const enhancedOption: CascaderOption & {
      level: number;
      path: number[];
      valuePath: Array<string | number | Record<string, any>>;
      labelPath: string[];
    } = {
      ...option,
      level: startLevel,
      path: currentIndexPath,
      valuePath: currentValuePath,
      labelPath: currentLabelPath,
    };
    // 递归处理子节点
    if (enhancedOption.children && enhancedOption.children.length > 0) {
      enhancedOption.children = enhanceCascaderOptions(
        enhancedOption.children,
        startLevel + 1,
        currentIndexPath,
        currentValuePath,
        currentLabelPath
      );
    }
    return enhancedOption;
  });
}
// 扁平化options
export function flattenCascaderOptions(options: CascaderOptionProps[]) {
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
  path: number[]
) => {
  return level == 1
    ? options.filter((item) => item.level == level)
    : options.filter((v) => {
        return (
          v.level == level &&
          v.path?.slice(0, v.path.length - 1).join('') == path.join('')
        );
      });
};

export default () => {
  const provide = (props: Props, emits: CascaderEmits) => {
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
      options: _options,
      fieldNames,
      valueKey,
    } = toRefs(props as RequiredDeep<CascaderProps>);
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
    // fieldKeys
    const fieldKeys = computed(() => {
      const keys = [
        'label',
        'value',
        'render',
        'disabled',
        'tagProps',
        'children',
        'isLeaf',
      ];
      return Object.fromEntries(
        keys.map((key) => [key, fieldNames.value[key] ?? key])
      ) as Record<string, string>;
    });
    // options
    const options = computed(() => {
      return flattenCascaderOptions(
        enhanceCascaderOptions(
          _options.value.map((item) => {
            const keys = [
              'label',
              'value',
              'render',
              'disabled',
              'tagProps',
              'children',
              'isLeaf',
            ];
            return Object.fromEntries(
              keys.map((key) => [
                key,
                (item as Record<string, string>)[fieldKeys.value[key]],
              ])
            );
          })
        )
      );
    });
    // 选中的option
    const selectOptions = computed(() => {
      return options.value.filter((item) => {
        if (pathMode.value) {
          return multiple.value
            ? computedValue.value.find(
                (v: number[]) => item.valuePath?.join('') == v.join('')
              )
            : computedValue.value.join('') == item.valuePath?.join('');
        } else {
          return multiple.value
            ? computedValue.value.find((v: number) => item.value == v)
            : computedValue.value == item.value;
        }
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
    // 提供给子组件
    _provide<CascaderContext>(CASCADER_CONTEXT_KEY, {
      computedValue,
      computedInputValue,
      computedVisible,
      options,
      curLevel,
      curPath,
      pathMode,
      multiple,
      slots,
      getValue,
      emits,
    });
    return {
      computedValue,
      computedInputValue,
      computedVisible,
      selectOptions,
      searchDelay,
      multiple,
      pathMode,
      disabled,
      allowClear,
      allowSearch,
      loading,
      curLevel,
      curPath,
      options,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<CascaderContext>(CASCADER_CONTEXT_KEY, {
      computedValue: ref(''),
      computedInputValue: ref(''),
      computedVisible: ref(false),
      options: ref([]),
      curLevel: ref(1),
      curPath: ref([]),
      pathMode: ref(false),
      multiple: ref(false),
      slots: {},
      getValue: () => {},
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
