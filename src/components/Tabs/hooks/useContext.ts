import {
  ref,
  provide as _provide,
  inject as _inject,
  toRefs,
  Ref,
  unref,
  useSlots,
} from 'vue';
import {
  findComponentsFromVnodes,
  getGlobalConfig,
  useControlValue,
} from '@shared/utils';
import { Props, RequiredDeep } from '@shared/type';
import { TabProps as _TabProps, TabEmits, TabKey } from '../type';
import TabPane from '../TabPane.vue';

export const TAB_PROVIDE_KEY = 'tab-context';

export interface TabContext {
  computedActiveKey: Ref<TabKey>;
  destoryOnHide: Ref<boolean>;
  emits: TabEmits;
}

export type TabProps = RequiredDeep<_TabProps>;

export default () => {
  const provide = (props: Props, emits: TabEmits) => {
    // 解构属性
    const { activeKey, defaultActiveKey, destoryOnHide } = toRefs(
      props as TabProps
    );
    const { size } = getGlobalConfig(props);
    // 获取插槽nodes
    const slots = useSlots();
    // nodes
    const tabPaneNodes = findComponentsFromVnodes(
      slots.default?.() || [],
      TabPane.name as string
    );
    // 活跃的key
    const computedActiveKey = useControlValue<TabKey>(
      activeKey,
      defaultActiveKey.value,
      (val) => {
        emits('update:activeKey', val);
      }
    );
    _provide<TabContext>(TAB_PROVIDE_KEY, {
      emits,
      computedActiveKey,
      destoryOnHide,
    });
    return {
      size,
      computedActiveKey,
      tabPaneNodes,
    };
  };
  const inject = (props: Props) => {
    return _inject<TabContext>(TAB_PROVIDE_KEY, {
      computedActiveKey: ref(''),
      destoryOnHide: ref(false),
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
