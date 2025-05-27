import { toRefs, Ref, provide as _provide, inject as _inject } from 'vue';
import {
  ButtonType,
  ButtonShape,
  ButtonStatus,
  ButtonProps as _ButtonProps,
  ButtonGroupProps as _ButtonGroupProps,
} from '../type';
import { Size, RequiredDeep, Props } from '@shared/type';
import { getGlobalConfig } from '@shared/utils';

const BUTTON_GROUP_CONTEXT_KEY = 'button-group-context';

export interface ButtonContext {
  type: Ref<ButtonType>;
  status: Ref<ButtonStatus>;
  size: Ref<Size>;
  shape: Ref<ButtonShape>;
  disabled: Ref<boolean>;
}

export type ButtonProps = RequiredDeep<_ButtonProps>;

export type ButtonGroupProps = RequiredDeep<_ButtonGroupProps>;

export default () => {
  const provide = (props: Props) => {
    const { type, status, shape, disabled } = toRefs(props as ButtonGroupProps);
    const { size } = getGlobalConfig(props);
    _provide<ButtonContext>(BUTTON_GROUP_CONTEXT_KEY, {
      type,
      status,
      size,
      shape,
      disabled,
    });
  };
  const inject = (props: Props) => {
    const { disabled, type, status, shape } = toRefs(props as ButtonProps);
    const { size } = getGlobalConfig(props);
    return _inject<ButtonContext>(BUTTON_GROUP_CONTEXT_KEY, {
      size,
      disabled,
      type,
      status,
      shape,
    });
  };
  return {
    provide,
    inject,
  };
};
