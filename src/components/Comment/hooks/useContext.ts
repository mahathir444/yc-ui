import { ref, provide as _provide, inject as _inject, Ref } from 'vue';

export const COMMENT_PROVIDE_KEY = 'comment-context';

export type CommentContext = Ref<number>;

export default () => {
  const level = _inject<CommentContext>(COMMENT_PROVIDE_KEY, ref(0));
  level.value++;
  _provide<CommentContext>(COMMENT_PROVIDE_KEY, level);
  return {
    level,
  };
};
