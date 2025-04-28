import { DropdownProps } from '@/components/Dropdown';
import { Ref } from 'vue';
export interface BreadcrumbProps {
  maxCount?: number;
  routes?: BreadcrumbRoute[];
  separator?: string | number;
  customUrl?: (path: string[]) => string;
}

export interface BreadcrumbItemProps {
  separator?: string | number;
  droplist?: BreadcrumbRoute[];
  dropdownProps?: DropdownProps;
  path?: string;
}

export interface BreadcrumbRoute {
  label?: string;
  path?: string;
  children?: BreadcrumbRoute[];
}
