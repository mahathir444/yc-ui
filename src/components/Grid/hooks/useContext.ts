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
import { getBreakpointValue, isArray } from '@shared/utils';

export const GRID_CONTEXT_KEY = 'grid-context';

export type GridContext = {
  breakpoint: Ref<BreakpointName>;
  div: Ref<boolean>;
  gutter: Ref<number[]>;
  cols: Ref<number>;
  colGap: Ref<number>;
  collapsed: Ref<boolean>;
  collapsedRows: Ref<number>;
};

export type GutterValue = Gutter | [Gutter, Gutter];

export default () => {
  const provide = (props: Props) => {
    const {
      gutter: _gutter = ref<GutterValue>(0),
      cols: _cols = ref(24),
      rowGap: _rowGap = ref(0),
      colGap: _colGap = ref(0),
      collapsed = ref(false),
      collapsedRows = ref(1),
      div = ref(false),
    } = toRefs(props);
    // breakpoint
    const breakpoint = ref<BreakpointName>('xxl');
    // cols
    const cols = computed(() => {
      return getBreakpointValue(breakpoint.value, _cols.value, 24) as number;
    });
    // rowgap
    const rowGap = computed(() => {
      return getBreakpointValue(breakpoint.value, _rowGap.value);
    });
    // colgap
    const colGap = computed(() => {
      return getBreakpointValue(breakpoint.value, _colGap.value, 0) as number;
    });
    // gutter[x,y]
    const gutter = computed(() => {
      const result = isArray(_gutter.value)
        ? _gutter.value.map((v) =>
            getBreakpointValue(breakpoint.value, v as ResponsiveValue, 0)
          )
        : [getBreakpointValue(breakpoint.value, _gutter.value, 0), 0];
      return result as number[];
    });

    // 提供给子组件
    _provide<GridContext>(GRID_CONTEXT_KEY, {
      breakpoint,
      gutter,
      div,
      cols,
      colGap,
      collapsed,
      collapsedRows,
    });
    return {
      breakpoint,
      cols,
      colGap,
      rowGap,
      gutter,
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
      collapsed: ref(false),
      collapsedRows: ref(1),
    });
  };
  return {
    provide,
    inject,
  };
};
