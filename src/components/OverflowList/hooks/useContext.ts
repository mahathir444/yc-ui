import {
  provide as _provide,
  inject as _inject,
  ref,
  Ref,
  onMounted,
  toRefs,
  computed,
  onBeforeUnmount,
} from 'vue';
import { YcPreventFocus } from '@shared/components';
import { Props } from '@/components/_shared/type';
import { unrefElement } from '@/components/_shared/utils';
import { nanoid } from 'nanoid';

export const OVERFLOW_LIST_PROVIDE_KEY = 'tabs-context';

type YcPreventInstance = InstanceType<typeof YcPreventFocus>;

export interface OverflowListContext {
  max: Ref<number>;
  widths: Ref<Map<string, number>>;
}

export default () => {
  const provide = () => {
    // 收集的width信息
    const widths = ref<Map<string, number>>(new Map());
    // 最大能展示的组件数量
    const max = ref<number>(10000);
    // 总的子组件数量
    const total = computed(() => widths.value.size);
    _provide<OverflowListContext>(OVERFLOW_LIST_PROVIDE_KEY, {
      max,
      widths,
    });
    return {
      widths,
      max,
      total,
    };
  };
  const inject = (props: Props, tagRef: Ref<YcPreventInstance | undefined>) => {
    const { isOverflow } = toRefs(props);
    const { widths, max } = _inject<OverflowListContext>(
      OVERFLOW_LIST_PROVIDE_KEY,
      {
        max: ref(100000),
        widths: ref(new Map()),
      }
    );
    // 记录当前的index
    const id = nanoid();
    // 记录当前的index
    const curIndex = computed(() => {
      return [...widths.value.keys()].findIndex((key) => key == id);
    });
    // 总的子组件数量
    const total = computed(() => widths.value.size);
    // 是否可见
    const visible = computed(
      () => isOverflow.value || curIndex.value < max.value
    );
    // 收集
    onMounted(() => {
      if (isOverflow.value) return;
      widths.value.set(id, unrefElement(tagRef)?.offsetWidth);
    });
    onBeforeUnmount(() => {
      widths.value.delete(id);
    });
    return {
      visible,
      total,
    };
  };
  return {
    provide,
    inject,
  };
};
