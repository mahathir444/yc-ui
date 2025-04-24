import { WritableComputedRef, Ref } from 'vue';
import { BreakpointName } from '@/components/Grid';
import { TooltipProps } from '@/components/Tooltip';
import { TriggerProps } from '@/components/Trigger';
import { Direction } from '@shared/type';

export interface MenuProps {
  theme?: 'light' | 'dark';
  mode?: Direction;
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
  //
  autoScrollIntoView?: boolean;
  scrollConfig?: Record<string, any>;
  triggerProps?: TriggerProps;
  tooltipProps?: TooltipProps;
  autoOpenSelected?: boolean;
  popupMaxHeight?: boolean | number;
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
  popupMaxHeight?: boolean | number;
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
  autoOpen: Ref<boolean>;
  emits: MenuEmits;
}

export type ChlidKey = {
  level: number;
  type: 'menuitem' | 'submenu';
  label: string;
  path: string;
};

export interface SubMenuProvide {
  childKeys: Ref<ChlidKey[]>;
  level: Ref<number>;
  childLevel: number;
}
