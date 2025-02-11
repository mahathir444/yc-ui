export type YcButtonStatus = 'normal' | 'warning' | 'success' | 'danger';

// icon
export interface YcLinkProps {
  href?: string;
  status?: YcButtonStatus;
  hoverable?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
