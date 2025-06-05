import {
  ref,
  Ref,
  provide as _provide,
  inject as _inject,
  inject,
  onBeforeUnmount,
  computed,
  Reactive,
  reactive,
} from 'vue';
import { nanoid } from 'nanoid';

export const COMMENT_CONTEXT_KEY = 'comment-context';

export interface CommentContext {
  depths: Reactive<Map<string, string>>;
}

export default () => {
  const { depths } = inject<CommentContext>(COMMENT_CONTEXT_KEY, {
    depths: reactive(new Map()),
  });
  const hasChildren = computed(() => depths.size > 1);
  const id = nanoid();
  depths.set(id, id);
  onBeforeUnmount(() => {
    depths.delete(id);
  });
  _provide<CommentContext>(COMMENT_CONTEXT_KEY, {
    depths,
  });
  return {
    hasChildren,
  };
};
