// icon
export interface LinkProps {
  href?: string;
  status?: LinkStatus;
  hoverable?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export type LinkStatus = 'normal' | 'warning' | 'success' | 'danger';

// 内部使用
export type LinkEvent = MouseEvent;

export type LinkEventType = 'click' | 'dblclick' | 'contextmenu';
