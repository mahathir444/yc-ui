import { WritableComputedRef, Ref, ComputedRef } from 'vue';
import { BreakpointName } from '@/components/Grid';
import { TooltipProps } from '@/components/Tooltip';
import { TriggerProps } from '@/components/Trigger';

export interface MenuProps {
  theme?: 'light' | 'dark';
  mode?: MenuMode;
  levelIndent?: number;
  autoOpen?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  collapsedWidth?: number;
  accordion?: boolean;
  showCollapseButton?: boolean;
  selectedKeys?: string;
  defaultSelectedKeys?: string;
  openKeys?: string[];
  defaultOpenKeys?: string[];
  breakpoint?: BreakpointName;
  triggerProps?: TriggerProps;
  tooltipProps?: TooltipProps;
  autoOpenSelected?: boolean;
  popupMaxHeight?: PopupMaxHeight;
  //
  autoScrollIntoView?: boolean;
  scrollConfig?: Record<string, any>;
}

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
  popupMaxHeight?: PopupMaxHeight;
}

export interface MenuItemProps {
  path?: string;
  disabled?: boolean;
  isSubmenu?: boolean;
}

type MenuMode = 'vertical' | 'pop' | 'horizontal';
export type PopupMaxHeight = boolean | number;

export interface MenuProvide {
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
  popupMaxHeight: Ref<PopupMaxHeight>;
  emits: MenuEmits;
}

export interface SubMenuProvide {
  childKeys: Ref<ChlidKey[]>;
  level: Ref<number>;
  childLevel: number;
  popupMaxHeight: ComputedRef<number> | Ref<number>;
}

export type ChlidKey = {
  level: number;
  type: 'menuitem' | 'submenu';
  label: string;
  path: string;
};

export interface ChlidTreeNode {
  label: string;
  type: 'menuitem' | 'submenu';
  level: number;
  path: string;
  children?: ChlidTreeNode[];
}
