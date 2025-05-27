import { toRefs, Ref, provide as _provide, inject as _inject } from 'vue';
import { Props } from '@shared/type';
import { AvatarShape } from '../type';

export const AVATAR_GROUP_CONTEXT_KEY = 'radio-group-context';

export interface AvatarContext {
  shape: Ref<AvatarShape>;
  size: Ref<number>;
  autoFixFontSize: Ref<boolean>;
}

export default () => {
  const provide = (props: Props) => {
    const { shape, size, autoFixFontSize } = toRefs(props);
    _provide<AvatarContext>(AVATAR_GROUP_CONTEXT_KEY, {
      shape,
      size,
      autoFixFontSize,
    });
  };
  const inject = (props: Props) => {
    const { shape, size, autoFixFontSize } = toRefs(props);
    return _inject<AvatarContext>(AVATAR_GROUP_CONTEXT_KEY, {
      shape,
      size,
      autoFixFontSize,
    });
  };
  return {
    provide,
    inject,
  };
};
