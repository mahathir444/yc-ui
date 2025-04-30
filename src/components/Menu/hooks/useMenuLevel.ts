import { ref, inject, computed, ComputedRef, Ref, provide } from 'vue';
import { MenuItemData } from './useProvide';

export const SUBMENU_PROVIDE_KEY = 'sub-menu-props';

export interface SubMenuProvide {
  childKeys: Ref<ChlidKey[]>;
  level: Ref<number>;
  childLevel: number;
  popupMaxHeight: ComputedRef<number> | Ref<number>;
}

export interface ChlidTreeNode {
  label: string;
  type: 'menuitem' | 'submenu';
  level: number;
  path: string;
  children?: ChlidTreeNode[];
}

export type ChlidKey = {
  level: number;
  type: 'menuitem' | 'submenu';
  label: string;
  path: string;
};

// 构建menu-tree
export function buildMenuTree(flatMenu: ChlidTreeNode[]): ChlidTreeNode[] {
  // 首先对菜单按level排序，确保父节点在前
  const sortedMenu = [...flatMenu].sort((a, b) => a.level - b.level);
  const tree: ChlidTreeNode[] = [];
  const map: Record<number, ChlidTreeNode> = {};
  // 创建所有节点的映射
  sortedMenu.forEach((item, index) => {
    map[index] = {
      ...item,
      children: [],
    };
  });
  // 构建树结构
  sortedMenu.forEach((item, index) => {
    const node = map[index];
    if (item.level === -1) {
      // 顶级菜单
      tree.push(node);
    } else {
      // 寻找父节点
      let parentFound = false;
      // 从当前节点向前查找可能的父节点
      for (let i = index - 1; i >= 0; i--) {
        const potentialParent = sortedMenu[i];
        // 父节点条件：level更小且是submenu类型
        if (
          potentialParent.level < item.level &&
          potentialParent.type === 'submenu'
        ) {
          map[i].children?.push(node);
          parentFound = true;
          break;
        }
      }
      // 如果没有找到父节点，则作为顶级节点
      if (!parentFound) {
        tree.push(node);
      }
    }
  });

  return tree;
}

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
    return buildMenuTree(childKeys.value)?.[0]?.children || [];
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
