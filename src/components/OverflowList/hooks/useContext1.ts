import {
  provide as _provide,
  inject as _inject,
  ref,
  Ref,
  onMounted,
} from 'vue';
import { YcPreventFocus } from '@shared/components';

export const OVERFLOW_LIST_PROVIDE_KEY = 'tabs-context';

type YcPreventInstance = InstanceType<typeof YcPreventFocus>;

export interface OverflowListContext {
  index: Ref<number>;
  max: Ref<number>;
  widths: Ref<number[]>;
  isInject: Ref<boolean>;
}

export default () => {
  const provide = () => {
    const index = ref<number>(0);
    const widths = ref<number[]>([]);
    const max = ref<number>(10000);
    _provide<OverflowListContext>(OVERFLOW_LIST_PROVIDE_KEY, {
      isInject: ref(true),
      max,
      index,
      widths,
    });
    return {
      index,
      widths,
      max,
    };
  };
  const inject = (tagRef: Ref<YcPreventInstance | undefined>) => {
    const injection = _inject<OverflowListContext>(OVERFLOW_LIST_PROVIDE_KEY, {
      isInject: ref(false),
      max: ref(0),
      index: ref(0),
      widths: ref([]),
    });
    const { widths, index, isInject, max } = injection;
    // 记录当前的index
    const curIndex = ref(0);
    // 收集
    onMounted(() => {
      if (!isInject) return;
      curIndex.value = index.value++;
      widths.value[curIndex.value - 1] = tagRef.value?.getRef?.()?.offsetWidth;
    });
    return {
      curIndex,
      ...injection,
    };
  };
  return {
    provide,
    inject,
  };
};
