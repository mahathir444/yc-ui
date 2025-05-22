import { DropdownProps } from '@/components/Dropdown';
export interface BreadcrumbProps {
  maxCount?: number;
  routes?: BreadcrumbRoute[];
  separator?: BreadcrumbSeparator;
  customUrl?: CustomUrl;
}

export interface BreadcrumbSlots {
  default(): void;
  ['item-render'](params: {
    route: BreadcrumbRoute;
    routes: BreadcrumbRoute[];
    paths: string[];
  }): void;
  ['more-icon'](): void;
  separator(): void;
}

export interface BreadcrumbItemProps {
  separator?: BreadcrumbSeparator;
  droplist?: BreadcrumbRoute[];
  dropdownProps?: DropdownProps;
  path?: string;
}

export interface BreadcrumbItemSlots {
  default(): void;
  ['more-icon'](): void;
  droplist(): void;
  separator(): void;
}

export interface BreadcrumbRoute {
  label?: string;
  path?: string;
  children?: BreadcrumbRoute[];
}

export type CustomUrl = (path: string[]) => string;
export type BreadcrumbSeparator = string | number;
