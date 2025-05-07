import {
  ref,
  WritableComputedRef,
  Ref,
  provide as _provide,
  inject as _inject,
  toRefs,
} from 'vue';
import { TooltipProps } from '@/components/Tooltip';
import { TriggerProps } from '@/components/Trigger';
import { MenuMode, PopupMaxHeight, MenuEmits } from '../type';
import { useControlValue } from '@shared/hooks';
import { Props } from '@shared/type';
import { ChlidTreeNode } from './useMenuLevel';
import useCalcMaxItems from './useCalcMaxItems';

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
  theme: Ref<'light' | 'dark'>;
  autoScrollIntoView: Ref<boolean>;
  scrollConfig: Ref<ScrollIntoViewOptions>;
  popupMaxHeight: Ref<PopupMaxHeight>;
  index: Ref<number>;
  max: Ref<number>;
  menuItemData: Ref<MenuItemData[]>;
  emits: MenuEmits;
}

export type MenuItemData = {
  width: number;
  childTree: ChlidTreeNode[];
};

export default () => {
  const provide = (
    props: Props,
    emits: MenuEmits,
    menuRef: Ref<HTMLDivElement | undefined>
  ) => {
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
      triggerProps,
      tooltipProps,
      autoOpenSelected,
      mode,
      theme,
      popupMaxHeight,
      autoScrollIntoView,
      scrollConfig,
      collapsedWidth,
    } = toRefs(props);
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
    const { max, index, menuItemData } = useCalcMaxItems(menuRef);
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
      autoScrollIntoView,
      scrollConfig,
      index,
      theme,
      menuItemData,
      max,
      emits,
    });
    return {
      max,
      menuItemData,
      computedCollapsed,
      breakpoint,
      collapsedWidth,
      computedSelectedKeys,
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
      theme: ref('light'),
      popupMaxHeight: ref(167),
      autoScrollIntoView: ref(false),
      scrollConfig: ref({}),
      index: ref(0),
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
