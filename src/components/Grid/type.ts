import { Ref } from 'vue';

export interface RowProps {
  gutter?: number | ResponsiveValue;
  justify?: 'start' | 'center' | 'end' | 'space-around' | 'space-between';
  align?: 'start' | 'center' | 'end' | 'stretch';
  div?: boolean;
  wrap?: boolean;
}

export interface ColProps {
  span?: number | ResponsiveValue;
  offset?: number | ResponsiveValue;
  order?: number | ResponsiveValue;
  flex?: Flex | ResponsiveValue;
}

export type ResponsiveValue<T = number | string> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
};

export type BreakpointName = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type Flex = number | string | 'initial' | 'auto' | 'none';

export type GridProvide = {
  gutter: Ref<number | ResponsiveValue>;
};
