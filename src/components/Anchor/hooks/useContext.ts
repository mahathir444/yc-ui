import {
  ref,
  toRefs,
  Ref,
  computed,
  provide as _provide,
  inject as _inject,
} from 'vue';
import {
  getElement,
  findFirstScrollableParent,
  isUndefined,
} from '@shared/utils';
import { Props } from '@shared/type';

export const ANCHOR_CONTEXT_KEY = 'anchor-context';

export interface AnchorContext {
  hrefs: Ref<string[]>;
  order: Ref<number>;
  changeHash: Ref<boolean>;
  smooth: Ref<boolean>;
  boundary: Ref<string | number>;
  lineLess: Ref<boolean>;
  curHref: Ref<string>;
  scrollContainer: Ref<HTMLElement | undefined>;
}

export default () => {
  const provide = (props: Props, listRef: Ref<HTMLDivElement | undefined>) => {
    const {
      changeHash,
      smooth,
      boundary,
      lineLess,
      scrollContainer: _scrollContainer,
    } = toRefs(props);
    // 当前的link
    const curHref = ref<string>('');
    // hrefs
    const hrefs = ref<string[]>([]);
    // order次序
    const order = ref<number>(0);
    // 滚动容器
    const scrollContainer = computed(() => {
      return isUndefined(_scrollContainer.value)
        ? findFirstScrollableParent(listRef.value)
        : getElement(_scrollContainer.value);
    });
    _provide<AnchorContext>(ANCHOR_CONTEXT_KEY, {
      hrefs,
      order,
      changeHash,
      smooth,
      boundary,
      lineLess,
      curHref,
      scrollContainer,
    });
    return {
      hrefs,
      order,
      changeHash,
      smooth,
      boundary,
      lineLess,
      curHref,
      scrollContainer,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<AnchorContext>(ANCHOR_CONTEXT_KEY, {
      hrefs: ref<string[]>([]),
      order: ref(0),
      changeHash: ref(true),
      smooth: ref(true),
      boundary: ref('start'),
      curHref: ref(''),
      lineLess: ref(false),
      scrollContainer: ref<HTMLElement>(),
    });
  };
  return {
    provide,
    inject,
  };
};
