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
  autoScrollIntoView?: boolean;
  scrollConfig?: ScrollIntoViewOptions;
}

export interface MenuEmits {
  (e: 'update:selectedKeys', value: string): void;
  (e: 'update:openKeys', value: string): void;
  (e: 'update:collapsed', value: boolean): void;
  (
    e: 'collapse',
    collapsed: boolean,
    type: 'clickTrigger' | 'responsive'
  ): void;
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

export interface MenuItemGroupProps {
  title?: string;
}

export type MenuMode = 'vertical' | 'pop' | 'horizontal';

export type PopupMaxHeight = boolean | number;
