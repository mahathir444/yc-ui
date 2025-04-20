// icon
export interface LinkProps {
  href?: string;
  icon?: boolean;
  status?: LinkStatus;
  hoverable?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export type LinkStatus = 'normal' | 'warning' | 'success' | 'danger';
