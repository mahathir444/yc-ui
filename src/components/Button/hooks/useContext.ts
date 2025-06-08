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

type FieldValue =
  | ButtonShape
  | ButtonStatus
  | ButtonType
  | boolean
  | Size
  | undefined;

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
    const { size: globalSize } = getGlobalConfig(props);
    const {
      type: _type,
      status: _status,
      shape: _shape,
      disabled: _disabled,
      size: _size,
    } = toRefs(props);
    const { type, status, shape, size, disabled } = _inject<ButtonContext>(
      BUTTON_GROUP_CONTEXT_KEY,
      {
        type: ref('secondary'),
        status: ref('normal'),
        shape: ref('square'),
        disabled: ref(false),
      }
    );
    // 获取field
    const getField = (
      value: FieldValue,
      injectValue: FieldValue,
      globalValue?: FieldValue
    ) => {
      if (!isUndefined(value)) {
        return value;
      }
      if (isUndefined(globalValue)) {
        return injectValue;
      }
      return !isUndefined(injectValue) ? injectValue : globalValue;
    };
    return {
      disabled: computed(() => getField(_disabled.value, disabled.value)),
      type: computed(() => getField(_type.value, type.value)),
      status: computed(() => getField(_status.value, status.value)),
      shape: computed(() => getField(_shape.value, shape.value)),
      size: computed(() =>
        getField(_size.value, size?.value, globalSize.value)
      ),
    };
  };
  return {
    provide,
    inject,
  };
};
