import { Direction, ObjectData } from '@shared/type';
import { GridProps } from '../Grid';
import { PaginationProps } from '../Pagination';
import { VirtualListProps } from '../Select';

export interface ListProps {
  data?: ObjectData[];
  size?: ListSize;
  bordered?: boolean;
  split?: boolean;
  loading?: boolean;
  hoverable?: boolean;
  paginationProps?: PaginationProps;
  gridProps?: GridProps;
  maxHeight?: number | string;
  bottomOffset?: number;
  virtualListProps?: VirtualListProps;
  scrollbar?: boolean;
}

export interface ListEmits {
  (e: 'scroll'): void;
  (e: 'reach-bottom'): void;
  (e: 'page-change', value: number): void;
  (e: 'page-size-change', value: number): void;
}

export interface ListSlots {
  empty(): void;
  header(): void;
  footer(): void;
  default(): void;
  ['scroll-loading'](): void;
  item(params: { index: number; item: ObjectData }): void;
}

export interface ListItemProps {
  actionLayout?: Direction;
}

export interface ListItemSlots {
  default(): void;
  meta(): void;
  extra(): void;
  actions(): void;
}

export interface ListItemMetaProps {
  title?: string;
  description?: string;
}

export interface ListItemMetaSlots {
  avatar(): void;
  title(): void;
  description(): void;
}

export type ListSize = 'small' | 'medium' | 'large';
