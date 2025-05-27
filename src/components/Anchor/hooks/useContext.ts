import {
  ref,
  toRefs,
  Ref,
  computed,
  provide as _provide,
  inject as _inject,
  onBeforeUnmount,
} from 'vue';
import {
  getElement,
  findFirstScrollableParent,
  isUndefined,
} from '@shared/utils';
import { Props } from '@shared/type';
import { nanoid } from 'nanoid';

export const ANCHOR_CONTEXT_KEY = 'anchor-context';

export interface AnchorContext {
  hrefs: Ref<string[]>;
  herfMap: Ref<Map<string, string>>;
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
    // herfMap
    const herfMap = ref<Map<string, string>>(new Map());
    // hrefs
    const hrefs = computed(() => [...herfMap.value.values()]);
    // 滚动容器
    const scrollContainer = computed(() => {
      return isUndefined(_scrollContainer.value)
        ? findFirstScrollableParent(listRef.value)
        : getElement(_scrollContainer.value);
    });
    _provide<AnchorContext>(ANCHOR_CONTEXT_KEY, {
      hrefs,
      herfMap,
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
  const inject = (props: Props) => {
    // 接收的值
    const injection = _inject<AnchorContext>(ANCHOR_CONTEXT_KEY, {
      hrefs: ref([]),
      herfMap: ref(new Map()),
      changeHash: ref(true),
      smooth: ref(true),
      boundary: ref('start'),
      curHref: ref(''),
      lineLess: ref(false),
      scrollContainer: ref(),
    });
    const { herfMap } = injection;
    // 收集href
    const collectHref = () => {
      const id = nanoid();
      herfMap.value.set(id, props.href);
      // 卸载的时候注销
      onBeforeUnmount(() => {
        herfMap.value.delete(id);
      });
    };
    return {
      ...injection,
      collectHref,
    };
  };
  return {
    provide,
    inject,
  };
};
