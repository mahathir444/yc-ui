import {
  useSlots,
  provide as _provide,
  inject as _inject,
  VNode,
  computed,
  ComputedRef,
  ref,
  Ref,
} from 'vue';

export const CARD_PROVIDE_KEY = 'card-props';

export interface CardProvide {
  actions: ComputedRef<VNode[]>;
  hasMeta: Ref<boolean>;
  hasGrid: Ref<boolean>;
}

export default () => {
  const provide = () => {
    const slots = useSlots();
    const hasMeta = ref<boolean>(false);
    const hasGrid = ref<boolean>(false);
    const actions = computed<VNode[]>(() => slots.actions?.() || []);
    _provide<CardProvide>(CARD_PROVIDE_KEY, {
      actions,
      hasMeta,
      hasGrid,
    });
    return {
      hasMeta,
      hasGrid,
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
