import { ref, inject, computed, Ref, provide } from 'vue';
import { SUBMENU_PROVIDE_KEY } from '@shared/constants';
import { SubMenuProvide } from '../type';
import { buildMenuTree } from '@shared/utils';

export default (params: {
  mode: 'submenu' | 'menuitem';
  isSubHeader: boolean;
  path: Ref<string>;
  computedSelectedKeys: Ref<string>;
}) => {
  const { mode, isSubHeader, computedSelectedKeys, path } = params;
  // 接收submenu注入
  const { childKeys, level, childLevel, popupMaxHeight } =
    inject<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
      childKeys: ref([]),
      level: ref<number>(1),
      childLevel: 0,
      popupMaxHeight: ref(167),
    });
  // submen的子等级
  const submenuLevel = level.value - 1;
  // 子菜单转树
  const childTree = computed(() => {
    return buildMenuTree(childKeys.value);
  });
  // 是否选中
  const isSelected = computed(() => {
    if (isSubHeader) {
      const target = childKeys.value.find((item) => {
        return (
          item.path == computedSelectedKeys.value && item.type != 'submenu'
        );
      });
      return submenuLevel <= (target?.level ?? -1);
    }
    return computedSelectedKeys.value == path.value;
  });
  // 收集keys
  const collectKeys = (title: string) => {
    if (isSubHeader) return;
    const index = childKeys.value.findIndex((item) => item.path == path.value);
    if (index != -1) return;
    childKeys.value.push({
      label: title,
      type: mode,
      level: mode == 'submenu' ? submenuLevel : childLevel,
      path: path.value,
    });
    console.log(childKeys.value);
  };
  // 注入值
  if (mode == 'submenu') {
    provide<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
      childKeys,
      level,
      childLevel: level.value++,
      popupMaxHeight,
    });
  }

  return {
    level,
    isSelected,
    childKeys,
    childLevel,
    childTree,
    popupMaxHeight,
    collectKeys,
  };
};
