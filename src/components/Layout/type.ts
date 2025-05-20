import { BreakpointName } from '@/components/Grid';

export interface LayoutProps {
  hasSider?: boolean;
}

export interface LayoutSlots {
  default(): void;
}

export interface LayoutHeaderSlots {
  default(): void;
}

export interface LayoutContentSlots {
  default(): void;
}

export interface LayoutFooterSlots {
  default(): void;
}

export interface LayoutSiderProps {
  theme?: 'dark' | 'light';
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  collapsible?: boolean;
  width?: number;
  collapsedWidth?: number;
  reverseArrow?: boolean;
  breakpoint?: BreakpointName;
  hideTrigger?: boolean;
  resizeDirections?: ResizeDirections;
}

export interface LayoutSiderEmits {
  (e: 'update:collapsed', collapsed: boolean): void;
  (
    e: 'collapse',
    collapsed: boolean,
    type: 'clickTrigger' | 'responsive'
  ): void;
  (e: 'breakpoint', collapsed: boolean): void;
}

export interface LayoutSiderSlots {
  default(): void;
  trigger(): void;
}

export type ResizeDirections = Array<'left' | 'right' | 'top' | 'bottom'>;
