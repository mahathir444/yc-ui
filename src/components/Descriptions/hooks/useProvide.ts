import {
  ref,
  toRefs,
  Ref,
  useSlots,
  computed,
  provide as _provide,
  inject as _inject,
} from 'vue';
import { DescData, DescriptionsProps as _DescriptionsProps } from '../type';
import { isNumber, mediaQueryHandler } from '@shared/utils';
import { BreakpointName } from '@/components/Grid/type';
import { Props, RequiredDeep } from '@shared/type';
import { useConfigProvder } from '@shared/hooks';
import { findComponentsFromVnodes } from '@shared/utils';
import YcDescriptionsItem from '../DescriptionsItem.vue';

export const DESCRIPTIONS_PROVIDE_KEY = 'radio-group-props';
export interface DescriptionsProvide {
  index: Ref<number>;
  descData: Ref<any[]>;
}
export type DescriptionsProps = RequiredDeep<_DescriptionsProps>;

export default () => {
  const provide = (props: Props) => {
    const {
      data: _data,
      column: _column,
      layout,
    } = toRefs(props as DescriptionsProps);
    // 获取全局配置
    const { size } = useConfigProvder(props);
    // 获取插槽内item
    const slots = useSlots();
    // 查找所有的descriptionItems
    const data = computed(() => {
      const items = findComponentsFromVnodes(
        slots.default?.() || [],
        YcDescriptionsItem.name as string
      );
      if (!items.length) return _data.value;
      return items.map((item) => {
        return {
          label: item.children?.label ?? item.props?.label,
          value: item.children?.default,
          span: item.props?.span,
        } as DescData;
      });
    });
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
    return {
      data,
      size,
      column,
      layout,
    };
  };

  return {
    provide,
  };
};
