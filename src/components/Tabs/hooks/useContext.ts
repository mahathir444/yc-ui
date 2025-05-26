import {
  toRefs,
  provide as _provide,
  inject as _inject,
  ref,
  Ref,
  computed,
  useSlots,
  onBeforeUnmount,
  onMounted,
  SlotsType,
  Slots,
} from 'vue';
import { useControlValue, getGlobalConfig } from '@shared/utils';
import { Direction, Props, RequiredDeep, Size } from '@shared/type';
import {
  TabKey,
  TabsEmits,
  TabTrigger,
  TabType,
  TabPaneProps as _TabPaneProps,
  TabScrollPosition,
  TabPositon,
} from '../type';
import { nanoid } from 'nanoid';

export const TABS_PROVIDE_KEY = 'tabs-context';

export interface TabsContext {
  editable: Ref<boolean>;
  type: Ref<TabType>;
  trigger: Ref<TabTrigger>;
  direction: Ref<Direction>;
  position: Ref<TabPositon>;
  computedActiveKey: Ref<TabKey>;
  titleRefs: Ref<HTMLSpanElement[]>;
  tabRefs: Ref<HTMLDivElement[]>;
  scrollPosition: Ref<TabScrollPosition>;
  listRef: Ref<HTMLDivElement | undefined>;
  headerPadding: Ref<boolean>;
  size: Ref<Size>;
  panesMap: Ref<Map<string, PaneNode>>;
  emits: TabsEmits;
}

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
      direction: _direction,
    } = toRefs(props);
    // 收集panesMap
    const panesMap = ref(new Map<string, PaneNode>());
    // 所有的panes实例
    const panes = computed(() => [...panesMap.value.values()]);
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

    _provide<TabsContext>(TABS_PROVIDE_KEY, {
      computedActiveKey,
      editable,
      direction,
      trigger,
      type,
      scrollPosition,
      position,
      headerPadding,
      size,
      listRef,
      titleRefs,
      tabRefs,
      panesMap,
      emits,
    });
    return {
      computedActiveKey,
      size,
      direction,
      position,
      autoSwitch,
      scrollPosition,
      panesMap,
      titleRefs,
      tabRefs,
      panes,
    };
  };
  const inject = () => {
    const injection = _inject<TabsContext>(TABS_PROVIDE_KEY, {
      computedActiveKey: ref(''),
      editable: ref(false),
      headerPadding: ref(false),
      trigger: ref('click'),
      type: ref('line'),
      direction: ref('horizontal'),
      scrollPosition: ref('auto'),
      position: ref('top'),
      size: ref('medium'),
      titleRefs: ref([]),
      listRef: ref(),
      tabRefs: ref([]),
      panesMap: ref(new Map()),
      emits: () => {},
    });
    const { panesMap } = injection;
    // 收集panes
    const collectPanes = (props: Props) => {
      const id = nanoid();
      const slots = useSlots();
      onMounted(() => {
        panesMap.value.set(id, {
          slots,
          ...(props as TabPaneProps),
        });
        console.log(panesMap.value);
      });
      onBeforeUnmount(() => {
        panesMap.value.delete(id);
      });
    };
    return {
      ...injection,
      collectPanes,
    };
  };

  return {
    provide,
    inject,
  };
};
