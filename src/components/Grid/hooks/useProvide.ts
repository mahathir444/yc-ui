import {
  ref,
  toRefs,
  ComputedRef,
  Ref,
  provide as _provide,
  inject as _inject,
  computed,
} from 'vue';
import { BreakpointName } from '../type';
import { Props } from '@shared/type';
import { isNumber, isObject } from '@shared/utils';

export const GRID_PROVIDE_KEY = 'grid-props';

export type GridProvide = {
  breakpoint: Ref<BreakpointName>;
  div: Ref<boolean>;
  gutter: Ref<number> | ComputedRef<number>;
  cols: Ref<number> | ComputedRef<number>;
  colGap: Ref<number> | ComputedRef<number>;
};

export default () => {
  const provide = (props: Props) => {
    const {
      gutter: _gutter = ref(0),
      cols: _cols = ref(24),
      colGap: _colGap = ref(0),
      div = ref(false),
    } = toRefs(props);
    // breakpoint
    const breakpoint = ref<BreakpointName>('xxl');
    // cols
    const cols = computed(() => {
      return isNumber(_cols.value)
        ? _cols.value
        : (_cols.value?.[breakpoint.value] as number);
    });
    // colgap
    const colGap = computed(() => {
      return isNumber(_colGap.value)
        ? _colGap.value
        : (_colGap.value?.[breakpoint.value] as number);
    });
    // gutter
    const gutter = computed(() => {
      return (
        isObject(_gutter.value)
          ? _gutter.value?.[breakpoint.value] || 0
          : _gutter.value
      ) as number;
    });
    // 提供给子组件
    _provide<GridProvide>(GRID_PROVIDE_KEY, {
      breakpoint,
      gutter,
      div,
      cols,
      colGap,
    });
    return {
      breakpoint,
      colGap,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<GridProvide>(GRID_PROVIDE_KEY, {
      gutter: ref(0),
      breakpoint: ref('xs'),
      div: ref(false),
      colGap: ref(0),
      cols: ref(24),
    });
  };
  return {
    provide,
    inject,
  };
};
