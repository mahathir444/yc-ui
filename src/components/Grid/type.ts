import { Ref } from 'vue';

export interface RowProps {
  gutter?: number;
  justify?: 'start' | 'center' | 'end' | 'space-around' | 'space-between';
  align?: 'start' | 'center' | 'end' | 'stretch';
  div?: boolean;
  wrap?: boolean;
}

export interface ColProps {
  span?: number;
  offset?: number;
  order?: number;
  flex?: number | string | 'initial' | 'auto' | 'none';
  xs?: ResponsiveValue;
  sm?: ResponsiveValue;
  md?: ResponsiveValue;
  lg?: ResponsiveValue;
  xl?: ResponsiveValue;
  xxl?: ResponsiveValue;
}

export type Flex = number | string | 'initial' | 'auto' | 'none';

export type ResponsiveValue = number | Record<string, any>;

export type GridProvide = {
  gutter: Ref<number>;
};
