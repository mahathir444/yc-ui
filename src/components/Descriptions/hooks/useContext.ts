import {
  ref,
  toRefs,
  Ref,
  useSlots,
  computed,
  provide as _provide,
  inject as _inject,
  CSSProperties,
  Slots,
} from 'vue';
import {
  DescriptionsAlign,
  DescData,
  DescriptionsProps as _DescriptionsProps,
} from '../type';
import {
  isNumber,
  isUndefined,
  isObject,
  mediaQueryHandler,
} from '@shared/utils';
import { BreakpointName, ResponsiveValue } from '@/components/Grid/type';
import { Props, RequiredDeep, Size } from '@shared/type';
import { getGlobalConfig } from '@shared/utils';
import { findComponentsFromVnodes } from '@shared/utils';
import YcDescriptionsItem from '../DescriptionsItem.vue';

export const DESCRIPTIONS_CONTEXT_KEY = 'radio-group-context';

export interface DescriptionsContext {
  labelStyle: Ref<CSSProperties>;
  valueStyle: Ref<CSSProperties>;
  align: Ref<DescriptionsAlign>;
  bordered: Ref<boolean>;
  size: Ref<Size>;
  slots: Slots;
}

export type DescriptionsProps = RequiredDeep<_DescriptionsProps>;

export default () => {
  const provide = (props: Props) => {
    const {
      data: _data,
      column: _column,
      layout,
      labelStyle,
      valueStyle,
      bordered,
      align,
    } = toRefs(props as DescriptionsProps);
    // 获取全局配置
    const { size } = getGlobalConfig(props);
    // 获取插槽内item
    const slots = useSlots();
    // 查找所有的descriptionItems
    const data = computed(() => {
      const nodes = findComponentsFromVnodes(
        slots.default?.() || [],
        YcDescriptionsItem.name as string
      );
      if (!nodes.length) return _data.value;
      return nodes.map((node) => {
        return {
          label: node.children?.label ?? node.props?.label,
          value: node.children?.default,
          span: node.props?.span,
        } as DescData;
      });
    });
    // 断电
    const breakpoint = ref<BreakpointName>('xxl');
    // column
    const column = computed(() => {
      return getBreakpointValue(_column.value, 3);
    });
    // 获取断电值
    function getBreakpointValue(
      value: number | ResponsiveValue,
      defaultValue?: number | string
    ): number | string | undefined {
      // 如果直接是值而非响应式对象，直接返回
      if (!isObject(value)) {
        return value;
      }
      const order: BreakpointName[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
      const index = order.indexOf(breakpoint.value);
      // 从当前断点开始向前查找
      for (let i = index; i >= 0; i--) {
        const bp = order[i];
        if (isUndefined(value[bp])) continue;
        return value[bp];
      }
      // 如果前面没找到，从当前断点向后查找
      for (let i = index + 1; i < order.length; i++) {
        const bp = order[i];
        if (isUndefined(value[bp])) continue;
        return value[bp];
      }
      // 如果都没找到，返回defaultValue
      return defaultValue;
    }
    // 媒体查询器
    mediaQueryHandler((name) => {
      breakpoint.value = name;
    });
    _provide<DescriptionsContext>(DESCRIPTIONS_CONTEXT_KEY, {
      size,
      bordered,
      align,
      labelStyle,
      valueStyle,
      slots,
    });
    return {
      data,
      size,
      column,
      layout,
    };
  };

  const inject = () => {
    return _inject<DescriptionsContext>(DESCRIPTIONS_CONTEXT_KEY, {
      size: ref('medium'),
      bordered: ref(false),
      align: ref('left'),
      labelStyle: ref({}),
      valueStyle: ref({}),
      slots: {},
    });
  };

  return {
    provide,
    inject,
  };
};
