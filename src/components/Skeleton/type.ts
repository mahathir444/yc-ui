export interface SkeletonProps {
  animation?: boolean;
  loading?: boolean;
}

export interface SkeletonSlots {
  default(): void;
  content(): void;
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
