import { toRefs, Ref, provide as _provide, inject as _inject } from 'vue';
import { Props } from '@shared/type';
import { AvatarShape } from '../type';

export const RADIO_GROUP_PROVIDE_KEY = 'radio-group-context';

export interface AvatarContext {
  shape: Ref<AvatarShape>;
  size: Ref<number>;
  autoFixFontSize: Ref<boolean>;
}

export default () => {
  const provide = (props: Props) => {
    const { shape, size, autoFixFontSize } = toRefs(props);
    // 提供给子组件
    _provide<AvatarContext>(RADIO_GROUP_PROVIDE_KEY, {
      shape,
      size,
      autoFixFontSize,
    });
  };
  const inject = (props: Props) => {
    const {
      shape: _shape,
      size: _size,
      autoFixFontSize: _autoFixFontSize,
    } = toRefs(props);
    // 接收的值
    return _inject<AvatarContext>(RADIO_GROUP_PROVIDE_KEY, {
      shape: _shape,
      size: _size,
      autoFixFontSize: _autoFixFontSize,
    });
  };
  return {
    provide,
    inject,
  };
};
