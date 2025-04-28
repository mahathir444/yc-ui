import {
  ref,
  toRefs,
  WritableComputedRef,
  Ref,
  provide as _provide,
  inject as _inject,
  Reactive,
  computed,
} from 'vue';
import { InputProps } from '@/components/Input';
import { TransferEmits, TransferItem, TransferProps } from '../type';
import { useControlValue } from '@shared/hooks';
import { RequiredDeep } from '@/components/_shared/type';

export const TRANSFER_PROVIDE_KEY = 'transfer-props';

export interface TransferProvide {
  computedValue: WritableComputedRef<string[]> | Ref<string[]>;
  computedSelected: WritableComputedRef<string[]> | Ref<string[]>;
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
  emits: any;
}

export type TransferPropsRquired = RequiredDeep<TransferProps>;

type Props = Reactive<Record<string, any>>;

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
    } = toRefs(props as TransferPropsRquired);
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
    _provide<TransferProvide>(TRANSFER_PROVIDE_KEY, {
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
    return _inject<TransferProvide>(TRANSFER_PROVIDE_KEY, {
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
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
