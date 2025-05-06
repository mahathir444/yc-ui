import { provide as _provide, inject as _inject, Reactive } from 'vue';
import { InputPropsRequired } from './useLimitedInput';
import { InputEmits } from '../type';
import { Props } from '@shared/type';

export const INPUT_PROVIDE_KEY = 'input-props';

export interface InputProvide {
  props?: InputPropsRequired;
  emits: InputEmits;
}

export default () => {
  const provide = (props: Props, emits: InputEmits) => {
    _provide<InputProvide>(INPUT_PROVIDE_KEY, {
      props: props as InputPropsRequired,
      emits,
    });
  };
  const inject = () => {
    return _inject<InputProvide>(INPUT_PROVIDE_KEY, {
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
