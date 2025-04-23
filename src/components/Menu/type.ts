import { WritableComputedRef, Ref } from 'vue';

export interface MenuProps {}

export interface MenuEmits {
  (e: 'update:selectedKeys', value: string): void;
  (e: 'update:openKeys', value: string): void;
  (e: 'update:collapsed', value: boolean): void;
  (e: 'menuItemClick', key: string): void;
  (e: 'subMenuClick', key: string, openKeys: string[]): void;
}

export interface SubMenuProps {
  path?: string;
  title?: string;
  selectable?: boolean;
  popup?: boolean;
  popupMaxHeight?: boolean;
}

export interface MenuItemProps {
  path?: string;
  disabled?: boolean;
  isSubmenu?: boolean;
}

export interface MenuProvide {
  computedSelectedKeys: WritableComputedRef<string> | Ref<string>;
  computedOpenKeys: WritableComputedRef<string[]> | Ref<string[]>;
  computedCollapsed: WritableComputedRef<string> | Ref<boolean>;
  levelIndent: Ref<number>;
  accordion: Ref<boolean>;
  emits: MenuEmits;
}

export interface SubMenuProvide {
  childKeys: Ref<
    {
      level: number;
      path: string;
    }[]
  >;
  level: Ref<number>;
  childLevel: number;
  submenuLevel: number;
}
