import { WritableComputedRef, Ref } from 'vue';

export interface MenuProps {}

export interface MenuEmits {
  (e: 'update:selectedKeys', value: string): void;
  (e: 'update:openKeys', value: string): void;
  (e: 'update:collapsed', value: boolean): void;
  (e: 'menu-item-click', key: string): void;
  (e: 'sub-menu-click', key: string, openKeys: string[]): void;
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
}

export interface MenuProvide {
  computedSelectedKeys: WritableComputedRef<string> | Ref<string>;
  computedOpenKeys: WritableComputedRef<string[]> | Ref<string[]>;
  computedCollapsed: WritableComputedRef<string> | Ref<boolean>;
  levelIndent: Ref<number>;
  emits: MenuEmits;
}

export interface SubMenuProvide {
  childKeys: Ref<string[]>;
  childLevel: number;
  level: Ref<number>;
}
