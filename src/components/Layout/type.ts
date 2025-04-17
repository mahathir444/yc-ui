import { ResponsiveValue } from '@shared/type';
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
