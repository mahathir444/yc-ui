import {
  ref,
  toRefs,
  Ref,
  useSlots,
  computed,
  provide as _provide,
  inject as _inject,
  ComputedRef,
  CSSProperties,
} from 'vue';
import {
  Align,
  Column,
  Layout,
  DescriptionsProps as _DescriptionsProps,
} from '../type';
import { isNumber, mediaQueryHandler } from '@shared/utils';
import { BreakpointName } from '@/components/Grid/type';
import { Props, RequiredDeep } from '@shared/type';
import { useConfigProvder } from '@shared/hooks';
import { findComponentsFromVnodes } from '@shared/utils';
import YcDescriptionsItem from '../DescriptionsItem.vue';

export const DESCRIPTIONS_PROVIDE_KEY = 'radio-group-props';
export interface DescriptionsProvide {
  align: Ref<Align>;
  length: Ref<number>;
  layout: Ref<Layout>;
  labelStyle: Ref<CSSProperties>;
  valueStyle: Ref<CSSProperties>;
}
export type DescriptionsProps = RequiredDeep<_DescriptionsProps>;

export default () => {
  const provide = (props: Props) => {
    const {
      align,
      layout,
      data,
      column: _column,
      labelStyle,
      valueStyle,
    } = toRefs(props as DescriptionsProps);
    // 获取全局配置
    const { size } = useConfigProvder(props);
    // 获取插槽内item
    const slots = useSlots();
    // 查找所有的descriptionItems
    const descriptionItems = computed(() => {
      return findComponentsFromVnodes(
        slots.default?.() || [],
        YcDescriptionsItem.name as string
      );
    });
    // item的数量
    const length = computed(() => descriptionItems.value.length);
    // 断电
    const breakpoint = ref<BreakpointName>('xxl');
    // column
    const column = computed(() => {
      const value = isNumber(_column.value)
        ? _column.value
        : (_column.value?.[breakpoint.value] ?? 3);
      return value as number;
    });
    // 媒体查询器
    mediaQueryHandler((name) => {
      breakpoint.value = name;
    });
    // 提供给子组件
    _provide<DescriptionsProvide>(DESCRIPTIONS_PROVIDE_KEY, {
      align,
      length,
      layout,
      labelStyle,
      valueStyle,
    });
    return {
      slots,
      data,
      size,
      column,
      descriptionItems,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<DescriptionsProvide>(DESCRIPTIONS_PROVIDE_KEY, {
      length: ref(0),
      align: ref('left'),
      layout: ref('horizontal'),
      labelStyle: ref({}),
      valueStyle: ref({}),
    });
  };
  return {
    provide,
    inject,
  };
};
