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
import { InputProps } from '@/components/Input';
import {
  TransferEmits,
  TransferItem,
  TransferProps as _TransferProps,
} from '../type';
import { RequiredDeep, Props } from '@shared/type';
import { useControlValue } from '@shared/utils';

export const TRANSFER_CONTEXT_KEY = 'transfer-context';

export interface TransferContext {
  computedValue: Ref<string[]>;
  computedSelected: Ref<string[]>;
  targetChecked: Ref<string[]>;
  sourceChecked: Ref<string[]>;
  sourceOptions: Ref<TransferItem[]>;
  targetOptions: Ref<TransferItem[]>;
  showSelectAll: Ref<boolean>;
  disabled: Ref<boolean>;
  title: Ref<string[]>;
  sourceInputSearchProps: Ref<InputProps>;
  targetInputSearchProps: Ref<InputProps>;
  showSearch: Ref<boolean>;
  oneWay: Ref<boolean>;
  simple: Ref<boolean>;
  slots: Slots;
  emits: TransferEmits;
}

export type TransferProps = RequiredDeep<_TransferProps>;

export default () => {
  const provide = (props: Props, emits: TransferEmits) => {
    const {
      modelValue,
      defaultValue,
      selected,
      defaultSelected,
      data,
      oneWay,
      simple,
      sourceInputSearchProps,
      targetInputSearchProps,
      showSearch,
      showSelectAll,
      disabled,
      title,
    } = toRefs(props as TransferProps);
    const slots = useSlots();
    // dataMap
    const dataMap = computed(() => {
      return Object.fromEntries(data.value.map((item) => [item.value, item]));
    });
    // 计算的value
    const computedValue = useControlValue<string[]>(
      modelValue,
      defaultValue.value,
      (val) => {
        emits('update:modelValue', val);
        emits('change', val);
      }
    );
    // target
    const computedValueMap = computed(() => {
      return new Map(
        (computedValue.value as string[]).map((item) => {
          return [item, item];
        })
      );
    });
    // 选中的value
    const computedSelected = useControlValue<string[]>(
      selected,
      defaultSelected.value,
      (val) => {
        emits('update:selected', val);
      }
    );
    // 源options
    const sourceOptions = computed(() => {
      return data.value.filter((item) => {
        return !computedValueMap.value.has(item.value as string);
      });
    });
    // 目标options
    const targetOptions = computed(() => {
      return (computedValue.value as string[]).map((item) => {
        const target = dataMap.value[item];
        return target;
      });
    });
    // 数据checked
    const sourceChecked = computed(() => {
      return computedSelected.value.filter(
        (item: string) => !computedValueMap.value.has(item)
      );
    });
    // 目标checked
    const targetChecked = computed(() => {
      return computedSelected.value.filter((item: string) =>
        computedValueMap.value.has(item)
      );
    });
    // 提供给子组件
    _provide<TransferContext>(TRANSFER_CONTEXT_KEY, {
      computedValue,
      computedSelected,
      targetChecked,
      sourceChecked,
      sourceOptions,
      targetOptions,
      oneWay,
      simple,
      sourceInputSearchProps,
      targetInputSearchProps,
      showSearch,
      showSelectAll,
      disabled,
      title,
      slots,
      emits,
    });
    return {
      computedValue,
      targetChecked,
      computedSelected,
      sourceChecked,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<TransferContext>(TRANSFER_CONTEXT_KEY, {
      computedValue: ref([]),
      computedSelected: ref([]),
      targetChecked: ref([]),
      sourceChecked: ref([]),
      sourceOptions: ref([]),
      targetOptions: ref([]),
      disabled: ref(false),
      oneWay: ref(false),
      simple: ref(false),
      title: ref([]),
      showSearch: ref(false),
      showSelectAll: ref(false),
      sourceInputSearchProps: ref({}),
      targetInputSearchProps: ref({}),
      slots: {},
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
