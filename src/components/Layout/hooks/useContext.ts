import { ref, Ref, provide as _provide, inject as _inject } from 'vue';

export const LAYOUT_PROVIDE_KEY = 'layout-context';

export interface LayoutContext {
  hasSider: Ref<boolean>;
  curLevel: Ref<number>;
}

export default () => {
  const provide = () => {
    // 是否有sider
    const hasSider = ref<boolean>(false);
    // 当前的level
    const curLevel = ref<number>(0);
    _provide<LayoutContext>(LAYOUT_PROVIDE_KEY, {
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
    const { hasSider, curLevel } = _inject<LayoutContext>(LAYOUT_PROVIDE_KEY, {
      curLevel: ref(0),
      hasSider: ref(false),
    });
    if (!hasSider.value) {
      hasSider.value = true;
      curLevel.value++;
    }
  };
  return {
    provide,
    inject,
  };
};
