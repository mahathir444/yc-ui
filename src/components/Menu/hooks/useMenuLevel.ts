import { ref, inject, computed, Ref, provide } from 'vue';
import { SUBMENU_PROVIDE_KEY } from '@shared/constants';
import { SubMenuProvide, MenuItemData } from '../type';
import { buildMenuTree } from '@shared/utils';

export default (params: {
  mode: 'submenu' | 'menuitem';
  order: Ref<number>;
  menuItemData: Ref<MenuItemData[]>;
  menuItemRef: Ref<HTMLDivElement | undefined>;
  isSubmenu: Ref<boolean>;
  path: Ref<string>;
  computedSelectedKeys: Ref<string>;
}) => {
  const {
    mode,
    isSubmenu,
    computedSelectedKeys,
    path,
    order,
    menuItemData,
    menuItemRef,
  } = params;
  // 接收submenu注入
  const { childKeys, level, childLevel, popupMaxHeight } =
    inject<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
      childKeys: ref([]),
      level: ref<number>(1),
      childLevel: 0,
      popupMaxHeight: ref(167),
    });
  // 子菜单转树
  const childTree = computed(() => {
    return buildMenuTree(childKeys.value);
  });
  // submen的子等级
  const submenuLevel = level.value - 1;
  // 当前的层级
  const curLevel = computed(() => {
    return isSubmenu.value ? childLevel - 1 : childLevel;
  });
  // 是否选中
  const isSelected = computed(() => {
    if (isSubmenu.value) {
      const target = childKeys.value.find((item) => {
        return (
          item.path == computedSelectedKeys.value && item.type != 'submenu'
        );
      });
      return submenuLevel <= (target?.level ?? -1);
    }
    return computedSelectedKeys.value == path.value;
  });
  // 当前的order,用于计算横向情况下的隐藏
  const curOrder = ref(!curLevel.value ? ++order.value : -1);
  // 收集keys
  const collectKeys = (title: string) => {
    if (mode != 'submenu') {
      menuItemData.value[curOrder.value - 1] = {
        width: menuItemRef.value!.offsetWidth,
        childTree: [
          {
            label: title,
            path: path.value,
            level: -1,
            type: isSubmenu.value ? 'submenu' : 'menuitem',
            children: isSubmenu.value ? childTree.value : [],
          },
        ],
      };
    }
    console.log(menuItemData.value);
    const target = childKeys.value.find((item) => item.path == path.value);
    if (isSubmenu.value || target) return;
    childKeys.value.push({
      label: title,
      type: mode,
      level: mode == 'submenu' ? submenuLevel : childLevel,
      path: path.value,
    });
  };
  // 注入值
  const provideKeys = () => {
    provide<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
      childKeys,
      level,
      childLevel: level.value++,
      popupMaxHeight,
    });
  };
  return {
    level,
    curLevel,
    isSelected,
    childKeys,
    childLevel,
    childTree,
    curOrder,
    popupMaxHeight,
    provideKeys,
    collectKeys,
  };
};
