import {
  toRefs,
  Ref,
  provide as _provide,
  inject as _inject,
  Reactive,
} from 'vue';
import {
  ButtonType,
  ButtonShape,
  ButtonStatus,
  ButtonProps,
  ButtonGroupProps,
} from '../type';
import { Size, RequiredDeep, Props } from '@shared/type';
import { useConfigProvder } from '@shared/hooks';

const BUTTON_GROUP_PROVIDE_KEY = 'button-group-props';

interface ButtonProvide {
  type: Ref<ButtonType>;
  status: Ref<ButtonStatus>;
  size: Ref<Size>;
  shape: Ref<ButtonShape>;
  disabled: Ref<boolean>;
}

export default () => {
  const provide = (props: Props) => {
    const { type, status, shape, disabled } = toRefs(
      props as RequiredDeep<ButtonGroupProps>
    );
    // 获取全局配置
    const { size } = useConfigProvder(props);
    //   注入
    _provide<ButtonProvide>(BUTTON_GROUP_PROVIDE_KEY, {
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
    } = toRefs(props as RequiredDeep<ButtonProps>);
    // 获取全局配置
    const { size: _size } = useConfigProvder(props);
    // buttonGroup接收的属性
    return _inject<ButtonProvide>(BUTTON_GROUP_PROVIDE_KEY, {
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
