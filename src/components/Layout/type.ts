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
}

export interface LayoutProvide {
  hasSider: Ref<boolean>;
  curLevel: Ref<number>;
}
