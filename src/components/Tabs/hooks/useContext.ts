import {
  toRefs,
  provide as _provide,
  inject as _inject,
  ref,
  Ref,
  computed,
  Slots,
} from 'vue';
import { useControlValue, getGlobalConfig } from '@shared/utils';
import { Direction, Props, RequiredDeep, Size } from '@shared/type';
import {
  TabPaneProps as _TabPaneProps,
  TabsProps as _TabsProps,
  TabKey,
  TabsEmits,
  TabTrigger,
  TabType,
  TabScrollPosition,
  TabPositon,
} from '../type';

export const TABS_CONTEXT_KEY = 'tabs-context';

export interface TabsContext {
  computedActiveKey: Ref<TabKey>;
  type: Ref<TabType>;
  trigger: Ref<TabTrigger>;
  direction: Ref<Direction>;
  position: Ref<TabPositon>;
  editable: Ref<boolean>;
  destoryOnHide: Ref<boolean>;
  listRef: Ref<HTMLDivElement | undefined>;
  titleRefs: Ref<HTMLSpanElement[]>;
  tabRefs: Ref<HTMLDivElement[]>;
  scrollPosition: Ref<TabScrollPosition>;
  headerPadding: Ref<boolean>;
  curScrollIndex: Ref<number>;
  size: Ref<Size>;
  emits: TabsEmits;
}

export type TabsProps = RequiredDeep<_TabsProps>;

export type TabPaneProps = RequiredDeep<_TabPaneProps>;

export type PaneNode = {
  slots: Slots;
} & TabPaneProps;

export default () => {
  const provide = (
    props: Props,
    emits: TabsEmits,
    listRef: Ref<HTMLDivElement | undefined>
  ) => {
    const { size } = getGlobalConfig(props);
    const {
      activeKey,
      defaultActiveKey,
      position,
      trigger,
      autoSwitch,
      type,
      editable,
      headerPadding,
      scrollPosition,
      destoryOnHide,
      direction: _direction,
    } = toRefs(props as TabsProps);
    // 当前活跃的key
    const computedActiveKey = useControlValue<TabKey>(
      activeKey,
      defaultActiveKey.value,
      (val) => {
        emits('update:activeKey', val);
      }
    );
    // titleRefs
    const titleRefs = ref<HTMLSpanElement[]>([]);
    // tabRefs
    const tabRefs = ref<HTMLDivElement[]>([]);
    // 方向
    const direction = computed(() => {
      if (['top', 'bottom'].includes(position.value)) {
        return 'horizontal';
      } else if (['left', 'right'].includes(position.value)) {
        return 'vertical';
      }
      return _direction.value;
    });
    // 当前滚动的Index
    const curScrollIndex = ref(0);
    _provide<TabsContext>(TABS_CONTEXT_KEY, {
      computedActiveKey,
      editable,
      direction,
      trigger,
      type,
      destoryOnHide,
      scrollPosition,
      position,
      headerPadding,
      size,
      listRef,
      titleRefs,
      tabRefs,
      curScrollIndex,
      emits,
    });
    return {
      computedActiveKey,
      size,
      direction,
      position,
      autoSwitch,
      scrollPosition,
      titleRefs,
      tabRefs,
      curScrollIndex,
    };
  };
  const inject = () => {
    return _inject<TabsContext>(TABS_CONTEXT_KEY, {
      computedActiveKey: ref(''),
      editable: ref(false),
      headerPadding: ref(false),
      trigger: ref('click'),
      type: ref('line'),
      direction: ref('horizontal'),
      scrollPosition: ref('nearest'),
      destoryOnHide: ref(false),
      position: ref('top'),
      size: ref('medium'),
      titleRefs: ref([]),
      listRef: ref(),
      tabRefs: ref([]),
      curScrollIndex: ref(0),
      emits: () => {},
    });
  };

  return {
    provide,
    inject,
  };
};
