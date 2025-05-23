import {
  toRefs,
  provide as _provide,
  inject as _inject,
  ref,
  Ref,
  computed,
} from 'vue';
import { useControlValue, getGlobalConfig } from '@shared/utils';
import { Direction, Props } from '@shared/type';
import {
  TabKey,
  TabsEmits,
  TabTrigger,
  TabType,
  TabScrollPosition,
  TabPositon,
} from '../type';

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
      emits,
    });
    return {
      size,
      direction,
      position,
      autoSwitch,
      titleRefs,
      computedActiveKey,
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
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
