import { Ref } from 'vue';

export interface SkeletonProps {
  animation?: boolean;
  loading?: boolean;
}

export interface SkeletonLineProps {
  rows?: number;
  widths?: number[];
  lineHeight?: number;
  lineSpacing?: number;
}

export interface SkeletonShapeProps {
  shape?: 'sqaure' | 'circle';
  size?: 'small' | 'medium' | 'large';
}

export type SkeletonProvide = {
  animation: Ref<boolean>;
  loading: Ref<boolean>;
};
