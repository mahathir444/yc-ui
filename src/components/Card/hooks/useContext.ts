import { useSlots, provide as _provide, inject as _inject, Slots } from 'vue';

export const CARD_CONTEXT_KEY = 'card-context';

export interface CardContext {
  slots: Slots;
}

export default () => {
  const provide = () => {
    const slots = useSlots();
    _provide<CardContext>(CARD_CONTEXT_KEY, {
      slots,
    });
    return {
      slots,
    };
  };
  const inject = () => {
    const { slots } = _inject<CardContext>(CARD_CONTEXT_KEY, {
      slots: {},
    });
    return {
      slots,
    };
  };
  return {
    provide,
    inject,
  };
};
