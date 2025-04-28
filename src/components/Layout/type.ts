import { Ref } from 'vue';
import { BreakpointName } from '@/components/Grid';

export interface LayoutProps {
  hasSider?: boolean;
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
  resizeDirections?: Array<'left' | 'right' | 'top' | 'bottom'>;
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
