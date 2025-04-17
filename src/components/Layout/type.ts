import { Ref } from 'vue';
import { ResponsiveValue } from '@shared/type';

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
  breakpoint?: ResponsiveValue;
  hideTrigger?: boolean;
}

export interface LayoutProvide {
  hasSider: Ref<boolean>;
  curLevel: Ref<number>;
}
