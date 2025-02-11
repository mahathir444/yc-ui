export type LinkStatus = 'normal' | 'warning' | 'success' | 'danger';
// icon
export interface LinkProps {
  href?: string;
  status?: LinkStatus;
  hoverable?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
