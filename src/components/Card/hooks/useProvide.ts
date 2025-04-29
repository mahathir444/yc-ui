import {
  useSlots,
  provide as _provide,
  inject as _inject,
  VNode,
  computed,
  ComputedRef,
  ref,
  Ref,
  Reactive,
} from 'vue';
import { useConfigProvder } from '@shared/hooks';

export const CARD_PROVIDE_KEY = 'card-props';

export interface CardProvide {
  actions: ComputedRef<VNode[]>;
  hasMeta: Ref<boolean>;
  hasGrid: Ref<boolean>;
}

type Props = Reactive<Record<string, any>>;

export default () => {
  const provide = (props: Props) => {
    const slots = useSlots();
    // 是否有meta
    const hasMeta = ref<boolean>(false);
    // 是否grid
    const hasGrid = ref<boolean>(false);
    // action vnode
    const actions = computed<VNode[]>(() => slots.actions?.() || []);
    // size
    const { size } = useConfigProvder(props);
    _provide<CardProvide>(CARD_PROVIDE_KEY, {
      actions,
      hasMeta,
      hasGrid,
    });
    return {
      hasMeta,
      hasGrid,
      size,
    };
  };
  const inject = (type: 'meta' | 'grid') => {
    const { hasMeta, hasGrid, actions } = _inject<CardProvide>(
      CARD_PROVIDE_KEY,
      {
        actions: computed(() => []),
        hasMeta: ref(false),
        hasGrid: ref(false),
      }
    );
    if (type == 'grid') {
      hasGrid.value = true;
    } else {
      hasMeta.value = true;
    }
    return {
      actions,
    };
  };
  return {
    provide,
    inject,
  };
};
