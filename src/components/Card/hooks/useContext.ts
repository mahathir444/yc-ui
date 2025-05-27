import {
  useSlots,
  provide as _provide,
  inject as _inject,
  ref,
  Ref,
  Slots,
} from 'vue';
import { getGlobalConfig } from '@shared/utils';
import { Props } from '@shared/type';

export const CARD_CONTEXT_KEY = 'card-context';

export interface CardContext {
  slots: Slots;
  hasMeta: Ref<boolean>;
  hasGrid: Ref<boolean>;
}

export default () => {
  const provide = (props: Props) => {
    const slots = useSlots();
    // 是否有meta
    const hasMeta = ref<boolean>(false);
    // 是否grid
    const hasGrid = ref<boolean>(false);
    // size
    const { size } = getGlobalConfig(props);
    _provide<CardContext>(CARD_CONTEXT_KEY, {
      slots,
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
    const { hasMeta, hasGrid, slots } = _inject<CardContext>(CARD_CONTEXT_KEY, {
      slots: {},
      hasMeta: ref(false),
      hasGrid: ref(false),
    });
    if (type == 'grid') {
      hasGrid.value = true;
    } else {
      hasMeta.value = true;
    }
    return {
      slots,
    };
  };
  return {
    provide,
    inject,
  };
};
