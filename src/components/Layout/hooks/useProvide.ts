import {
  ref,
  toRefs,
  ComputedRef,
  Ref,
  provide as _provide,
  inject as _inject,
  Reactive,
} from 'vue';

export const LAYOUT_PROVIDE_KEY = 'layout-props';

export interface LayoutProvide {
  hasSider: Ref<boolean>;
  curLevel: Ref<number>;
}

export default () => {
  const provide = () => {
    // 是否有sider
    const hasSider = ref<boolean>(false);
    // 当前的level
    const curLevel = ref<number>(0);
    _provide<LayoutProvide>(LAYOUT_PROVIDE_KEY, {
      hasSider,
      curLevel,
    });
    return {
      hasSider,
      curLevel,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<LayoutProvide>(LAYOUT_PROVIDE_KEY, {
      curLevel: ref(0),
      hasSider: ref(false),
    });
  };
  return {
    provide,
    inject,
  };
};
