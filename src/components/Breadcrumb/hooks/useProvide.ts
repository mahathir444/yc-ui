import {
  ref,
  Ref,
  inject as _inject,
  provide as _provide,
  Reactive,
  toRefs,
} from 'vue';

export const BREADCRUMB_PROVIDE_KEY = 'breadcrumb-props';

export interface BreadcrumbProvide {
  index: Ref<number>;
  maxCount: Ref<number>;
  separator: Ref<string | number>;
}

type Props = Reactive<Record<string, any>>;

export default () => {
  const provide = (props: Props) => {
    const { maxCount, separator, routes } = toRefs(props);
    // 次序
    const index = ref<number>(-1);
    // 发放数据
    _provide<BreadcrumbProvide>(BREADCRUMB_PROVIDE_KEY, {
      index,
      maxCount,
      separator,
    });
  };
  const inject = () => {
    return _inject<BreadcrumbProvide>(BREADCRUMB_PROVIDE_KEY, {
      index: ref(-1),
      maxCount: ref(0),
      separator: ref(''),
    });
  };
  return {
    inject,
    provide,
  };
};
