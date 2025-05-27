import {
  ref,
  toRefs,
  Ref,
  computed,
  provide as _provide,
  inject as _inject,
  useSlots,
} from 'vue';
import {
  getElement,
  findFirstScrollableParent,
  isUndefined,
  findComponentsFromVnodes,
} from '@shared/utils';
import { Props } from '@shared/type';
import AnchorLink from '../AnchorLink.vue';

export const ANCHOR_CONTEXT_KEY = 'anchor-context';

export interface AnchorContext {
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
    const slots = useSlots();
    // 当前的link
    const curHref = ref<string>('');
    // hrefs
    const hrefs = computed(() => {
      const node = findComponentsFromVnodes(
        slots.default?.() || [],
        AnchorLink.name as string
      );
      return node.map((item) => item.props.href);
    });
    // 滚动容器
    const scrollContainer = computed(() => {
      return isUndefined(_scrollContainer.value)
        ? findFirstScrollableParent(listRef.value)
        : getElement(_scrollContainer.value);
    });
    _provide<AnchorContext>(ANCHOR_CONTEXT_KEY, {
      changeHash,
      smooth,
      boundary,
      lineLess,
      curHref,
      scrollContainer,
    });
    return {
      hrefs,
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
      changeHash: ref(true),
      smooth: ref(true),
      boundary: ref('start'),
      curHref: ref(''),
      lineLess: ref(false),
      scrollContainer: ref(),
    });
  };
  return {
    provide,
    inject,
  };
};
