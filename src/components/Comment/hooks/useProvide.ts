import { ref, provide as _provide, inject as _inject, Ref } from 'vue';

export const COMMENT_PROVIDE_KEY = 'comment-props';

export type CommentProvide = Ref<number>;

export default () => {
  const level = _inject<CommentProvide>(COMMENT_PROVIDE_KEY, ref(0));
  level.value++;
  _provide<CommentProvide>(COMMENT_PROVIDE_KEY, level);
  return {
    level,
  };
};
