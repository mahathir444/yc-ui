import {
  ref,
  toRefs,
  Ref,
  provide as _provide,
  inject as _inject,
  computed,
} from 'vue';
import { BreakpointName, Gutter, ResponsiveValue } from '../type';
import { Props } from '@shared/type';
import { isArray, isNumber, isObject, isUndefined } from '@shared/utils';

export const GRID_CONTEXT_KEY = 'grid-context';

export type GridContext = {
  breakpoint: Ref<BreakpointName>;
  div: Ref<boolean>;
  gutter: Ref<number[]>;
  cols: Ref<number>;
  colGap: Ref<number>;
  getBreakpointValue: (...args: any) => any;
};

export type GutterValue = Gutter | [Gutter, Gutter];

export default () => {
  const provide = (props: Props) => {
    const {
      gutter: _gutter = ref<GutterValue>(0),
      cols: _cols = ref(24),
      rowGap: _rowGap = ref(0),
      colGap: _colGap = ref(0),
      div = ref(false),
    } = toRefs(props);
    // breakpoint
    const breakpoint = ref<BreakpointName>('xxl');
    // cols
    const cols = computed(() => {
      return getBreakpointValue(_cols.value, 24) as number;
    });
    // rowgap
    const rowGap = computed(() => {
      return getBreakpointValue(_rowGap.value);
    });
    // colgap
    const colGap = computed(() => {
      return getBreakpointValue(_colGap.value, 0) as number;
    });
    // gutter[x,y]
    const gutter = computed(() => {
      const result = isArray(_gutter.value)
        ? _gutter.value.map((v) => getBreakpointValue(v as ResponsiveValue, 0))
        : [getBreakpointValue(_gutter.value, 0), 0];
      return result as number[];
    });
    // 获取断点下的值
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
    // 提供给子组件
    _provide<GridContext>(GRID_CONTEXT_KEY, {
      breakpoint,
      gutter,
      div,
      cols,
      colGap,
      getBreakpointValue,
    });
    return {
      breakpoint,
      cols,
      colGap,
      rowGap,
      gutter,
      getBreakpointValue,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<GridContext>(GRID_CONTEXT_KEY, {
      gutter: ref([0, 0]),
      breakpoint: ref('xs'),
      div: ref(false),
      colGap: ref(0),
      cols: ref(24),
      getBreakpointValue: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
