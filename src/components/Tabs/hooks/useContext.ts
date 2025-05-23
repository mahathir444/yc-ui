import {
  toRefs,
  provide as _provide,
  inject as _inject,
  ref,
  Ref,
  computed,
  shallowReactive,
  useSlots,
} from 'vue';
import {
  useControlValue,
  getGlobalConfig,
  findComponentsFromVnodes,
} from '@shared/utils';
import { Direction, Props, Size, ObjectData } from '@shared/type';
import {
  TabKey,
  TabsEmits,
  TabTrigger,
  TabType,
  TabScrollPosition,
  TabPositon,
} from '../type';
import TabPane from '../TabPane.vue';

export const TABS_PROVIDE_KEY = 'tabs-context';

export interface TabsContext {
  editable: Ref<boolean>;
  type: Ref<TabType>;
  trigger: Ref<TabTrigger>;
  direction: Ref<Direction>;
  position: Ref<TabPositon>;
  computedActiveKey: Ref<TabKey>;
  titleRefs: Ref<HTMLSpanElement[]>;
  scrollPosition: Ref<TabScrollPosition>;
  listRef: Ref<HTMLDivElement | undefined>;
  headerPadding: Ref<boolean>;
  size: Ref<Size>;
  getTabPane: () => void;
  emits: TabsEmits;
}

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
      direction: _direction,
      position,
      trigger,
      autoSwitch,
      type,
      editable,
      scrollPosition,
      headerPadding,
    } = toRefs(props);
    // 获取插槽nodes
    const slots = useSlots();
    // nodes
    const tabPaneNodes = shallowReactive<ObjectData[]>([]);
    //
    const computedActiveKey = useControlValue<TabKey>(
      activeKey,
      defaultActiveKey.value,
      (val) => {
        emits('update:activeKey', val);
      }
    );
    // titleRefs
    const titleRefs = ref<HTMLSpanElement[]>([]);
    // 方向
    const direction = computed(() => {
      if (['top', 'bottom'].includes(position.value)) {
        return 'horizontal';
      } else if (['left', 'right'].includes(position.value)) {
        return 'vertical';
      }
      return _direction.value;
    });
    // 获取tabPane
    function getTabPane() {
      tabPaneNodes.splice(0);
      tabPaneNodes.push(
        ...findComponentsFromVnodes(
          slots.default?.() || [],
          TabPane.name as string
        )
      );
    }
    getTabPane();
    _provide<TabsContext>(TABS_PROVIDE_KEY, {
      computedActiveKey,
      editable,
      direction,
      trigger,
      type,
      titleRefs,
      scrollPosition,
      listRef,
      position,
      headerPadding,
      size,
      getTabPane,
      emits,
    });
    return {
      size,
      direction,
      position,
      autoSwitch,
      titleRefs,
      computedActiveKey,
      tabPaneNodes,
    };
  };
  const inject = () => {
    return _inject<TabsContext>(TABS_PROVIDE_KEY, {
      computedActiveKey: ref(''),
      editable: ref(false),
      trigger: ref('click'),
      type: ref('line'),
      direction: ref('horizontal'),
      titleRefs: ref([]),
      scrollPosition: ref('auto'),
      listRef: ref(),
      position: ref('top'),
      headerPadding: ref(false),
      size: ref('medium'),
      getTabPane: () => {},
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
