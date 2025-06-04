import {
  ref,
  Ref,
  provide as _provide,
  inject as _inject,
  inject,
  onBeforeUnmount,
  computed,
} from 'vue';
import { nanoid } from 'nanoid';

export const COMMENT_CONTEXT_KEY = 'comment-context';

export interface CommentContext {
  depths: Ref<Map<string, string>>;
}

export default () => {
  const { depths } = inject<CommentContext>(COMMENT_CONTEXT_KEY, {
    depths: ref(new Map()),
  });
  const hasChildren = computed(() => depths.value.size > 1);
  const id = nanoid();
  depths.value.set(id, id);
  onBeforeUnmount(() => {
    depths.value.delete(id);
  });
  _provide<CommentContext>(COMMENT_CONTEXT_KEY, {
    depths,
  });
  return {
    hasChildren,
  };
};
