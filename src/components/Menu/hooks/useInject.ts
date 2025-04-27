import { ref, inject } from 'vue';
import { MenuProvide } from '../type';
import { MENU_PROVIDE_KEY } from '@shared/constants';
export default () => {
  return inject<MenuProvide>(MENU_PROVIDE_KEY, {
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
