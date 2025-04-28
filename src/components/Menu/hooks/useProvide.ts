import {
  ref,
  WritableComputedRef,
  Ref,
  provide as _provide,
  inject as _inject,
  Reactive,
  toRefs,
} from 'vue';
import { TooltipProps } from '@/components/Tooltip';
import { TriggerProps } from '@/components/Trigger';
import { MenuMode, PopupMaxHeight, MenuEmits } from '../type';
import { useControlValue } from '@shared/hooks';
import { ChlidTreeNode } from './useMenuLevel';
import useCalcVisible from './useCalcVisible';

export const MENU_PROVIDE_KEY = 'menu-props';

interface MenuProvide {
  computedSelectedKeys: WritableComputedRef<string> | Ref<string>;
  computedOpenKeys: WritableComputedRef<string[]> | Ref<string[]>;
  computedCollapsed: WritableComputedRef<string> | Ref<boolean>;
  levelIndent: Ref<number>;
  accordion: Ref<boolean>;
  autoOpen: Ref<boolean>;
  triggerProps: Ref<TriggerProps>;
  tooltipProps: Ref<TooltipProps>;
  autoOpenSelected: Ref<boolean>;
  mode: Ref<MenuMode>;
  order: Ref<number>;
  max: Ref<number>;
  menuItemData: Ref<MenuItemData[]>;
  popupMaxHeight: Ref<PopupMaxHeight>;
  emits: MenuEmits;
}

export type MenuItemData = {
  width: number;
  childTree: ChlidTreeNode[];
};

type Props = Reactive<Record<string, any>>;

export default () => {
  const provide = (props: Props, emits: MenuEmits) => {
    // 解构属性
    const {
      selectedKeys,
      defaultSelectedKeys,
      openKeys,
      defaultOpenKeys,
      levelIndent,
      collapsed,
      defaultCollapsed,
      breakpoint,
      accordion,
      autoOpen,
      theme,
      triggerProps,
      tooltipProps,
      autoOpenSelected,
      mode,
      popupMaxHeight,
      collapsedWidth: _collapsedWidth,
    } = toRefs(props);
    // menuredf
    const menuRef = ref<HTMLDivElement>();
    // 选中的key
    const computedSelectedKeys = useControlValue<string>(
      selectedKeys,
      defaultSelectedKeys.value,
      (val) => {
        emits('update:selectedKeys', val);
      }
    );
    // 收缩状态
    const computedCollapsed = useControlValue<boolean>(
      collapsed,
      defaultCollapsed.value,
      (val) => {
        if (true) {
          computedOpenKeys.value = [];
        }
        emits('update:collapsed', val);
      }
    );
    // 展开的key
    const computedOpenKeys = useControlValue<string[]>(
      openKeys,
      defaultOpenKeys.value,
      (val) => {
        emits('update:openKeys', val);
      }
    );
    // 计算能显示的menuItem数目
    const { max, order, menuItemData } = useCalcVisible(menuRef);
    _provide<MenuProvide>(MENU_PROVIDE_KEY, {
      computedSelectedKeys,
      computedOpenKeys,
      computedCollapsed,
      levelIndent,
      accordion,
      autoOpen,
      triggerProps,
      tooltipProps,
      mode,
      autoOpenSelected,
      popupMaxHeight,
      order,
      menuItemData,
      max,
      emits,
    });
    return {
      computedCollapsed,
      _collapsedWidth,
      breakpoint,
    };
  };
  const inject = () => {
    return _inject<MenuProvide>(MENU_PROVIDE_KEY, {
      computedSelectedKeys: ref(''),
      computedOpenKeys: ref([]),
      levelIndent: ref(20),
      computedCollapsed: ref(false),
      accordion: ref(false),
      autoOpen: ref(false),
      tooltipProps: ref({}),
      triggerProps: ref({}),
      autoOpenSelected: ref(false),
      mode: ref('vertical'),
      popupMaxHeight: ref(167),
      order: ref(0),
      max: ref(0),
      menuItemData: ref([]),
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
