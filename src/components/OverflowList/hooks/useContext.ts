import {
  provide as _provide,
  inject as _inject,
  ref,
  Ref,
  onMounted,
  toRefs,
  computed,
} from 'vue';
import { YcPreventFocus } from '@shared/components';
import { Props } from '@/components/_shared/type';
import { unrefElement } from '@/components/_shared/utils';

export const OVERFLOW_LIST_PROVIDE_KEY = 'tabs-context';

type YcPreventInstance = InstanceType<typeof YcPreventFocus>;

export interface OverflowListContext {
  index: Ref<number>;
  max: Ref<number>;
  widths: Ref<number[]>;
}

export default () => {
  const provide = () => {
    const index = ref<number>(0);
    const widths = ref<number[]>([]);
    const max = ref<number>(10000);
    _provide<OverflowListContext>(OVERFLOW_LIST_PROVIDE_KEY, {
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
  const inject = (props: Props, tagRef: Ref<YcPreventInstance | undefined>) => {
    const { isOverflow } = toRefs(props);
    const { widths, index, max } = _inject<OverflowListContext>(
      OVERFLOW_LIST_PROVIDE_KEY,
      {
        max: ref(1),
        index: ref(0),
        widths: ref([]),
      }
    );
    // 记录当前的index
    const curIndex = ref(0);
    // 是否可见
    const visible = computed(
      () => isOverflow.value || curIndex.value < max.value
    );
    // 收集
    onMounted(() => {
      if (isOverflow.value) return;
      curIndex.value = ++index.value;
      widths.value[curIndex.value - 1] = unrefElement(tagRef)?.offsetWidth;
    });
    return {
      visible,
    };
  };
  return {
    provide,
    inject,
  };
};
