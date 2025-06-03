import {
  ref,
  toRefs,
  Ref,
  provide as _provide,
  inject as _inject,
  computed,
} from 'vue';
import {
  ButtonType,
  ButtonShape,
  ButtonStatus,
  ButtonProps as _ButtonProps,
  ButtonGroupProps as _ButtonGroupProps,
} from '../type';
import { Size, RequiredDeep, Props } from '@shared/type';
import { getGlobalConfig, isUndefined } from '@shared/utils';

const BUTTON_GROUP_CONTEXT_KEY = 'button-group-context';

export interface ButtonContext {
  type: Ref<ButtonType>;
  status: Ref<ButtonStatus>;
  size?: Ref<Size>;
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
    const { size: _size } = getGlobalConfig(props);
    const {
      type,
      status,
      shape,
      size = ref(),
      disabled,
    } = _inject<ButtonContext>(BUTTON_GROUP_CONTEXT_KEY, {
      type: ref('secondary'),
      status: ref('normal'),
      shape: ref('square'),
      disabled: ref(false),
    });
    // 获取field
    const getField = (
      value: any,
      injectValue: Ref<
        ButtonShape | ButtonStatus | ButtonType | boolean | Size | undefined
      >,
      globalValue?: Ref<Size>
    ) => {
      if (!isUndefined(value)) {
        return value;
      }
      if (isUndefined(globalValue)) {
        return injectValue.value;
      }
      return !isUndefined(injectValue.value)
        ? injectValue.value
        : globalValue.value;
    };
    return {
      disabled: getField(props.disabled, disabled),
      type: getField(props.type, type),
      status: getField(props.status, status),
      shape: getField(props.shape, shape),
      size: getField(props.size, size, _size),
    };
  };
  return {
    provide,
    inject,
  };
};
