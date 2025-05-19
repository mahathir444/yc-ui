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

const BUTTON_GROUP_PROVIDE_KEY = 'button-group-context';
export interface ButtonContext {
  type: Ref<ButtonType>;
  status: Ref<ButtonStatus>;
  size: Ref<Size>;
  shape: Ref<ButtonShape>;
  disabled: Ref<boolean>;
}
export type ButtonGroupProps = RequiredDeep<_ButtonGroupProps>;
export type ButtonProps = RequiredDeep<_ButtonProps>;

export default () => {
  const provide = (props: Props) => {
    const { type, status, shape, disabled } = toRefs(props as ButtonGroupProps);
    // 获取全局配置
    const { size } = getGlobalConfig(props);
    //   注入
    _provide<ButtonContext>(BUTTON_GROUP_PROVIDE_KEY, {
      type,
      status,
      size,
      shape,
      disabled,
    });
  };
  const inject = (props: Props) => {
    const {
      disabled: _disabled,
      type: _type,
      status: _status,
      shape: _shape,
    } = toRefs(props as ButtonProps);
    // 获取全局配置
    const { size: _size } = getGlobalConfig(props);
    // buttonGroup接收的属性
    return _inject<ButtonContext>(BUTTON_GROUP_PROVIDE_KEY, {
      size: _size,
      disabled: _disabled,
      type: _type,
      status: _status,
      shape: _shape,
    });
  };
  return {
    provide,
    inject,
  };
};
