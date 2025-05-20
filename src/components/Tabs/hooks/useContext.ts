import { toRefs, provide as _provide, inject as _inject, ref, Ref } from 'vue';
import { useControlValue, getGlobalConfig } from '@shared/utils';
import { Direction, Props } from '@shared/type';
import {
  TabKey,
  TabsEmits,
  TabTrigger,
  TabType,
  TabScrollPosition,
} from '../type';

export const TABS_PROVIDE_KEY = 'tabs-context';

export interface TabsContext {
  editable: Ref<boolean>;
  type: Ref<TabType>;
  trigger: Ref<TabTrigger>;
  direction: Ref<Direction>;
  computedActiveKey: Ref<TabKey>;
  titleRefs: Ref<HTMLSpanElement[]>;
  scrollPosition: Ref<TabScrollPosition>;
  listRef: Ref<HTMLDivElement | undefined>;
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
      direction,
      trigger,
      autoSwitch,
      type,
      editable,
      scrollPosition,
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
    _provide<TabsContext>(TABS_PROVIDE_KEY, {
      computedActiveKey,
      editable,
      direction,
      trigger,
      type,
      titleRefs,
      scrollPosition,
      listRef,
      emits,
    });
    return {
      size,
      titleRefs,
      computedActiveKey,
      direction,
      autoSwitch,
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
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
