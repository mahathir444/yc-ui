import { ChlidTreeNode } from '@/components/Menu';
//睡眠函数
export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
};

// 节流
export function throttleByRaf(cb: (...args: any[]) => void) {
  let timer = 0;

  const throttle = (...args: any[]): void => {
    if (timer) {
      window.cancelAnimationFrame(timer);
    }
    timer = window.requestAnimationFrame(() => {
      cb(...args);
      timer = 0;
    });
  };

  throttle.cancel = () => {
    window.cancelAnimationFrame(timer);
    timer = 0;
  };

  return throttle;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let isInvoked = false;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (timer) clearTimeout(timer);

    if (immediate && !isInvoked) {
      func.apply(context, args);
      isInvoked = true;
    }

    timer = setTimeout(() => {
      if (!immediate) {
        func.apply(context, args);
      }
      isInvoked = false;
    }, delay);
  };
}

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
