export interface AlertProps {
  type?: AlertType;
  showIcon?: boolean;
  closable?: boolean;
  title?: string;
  banner?: boolean;
  center?: boolean;
}

export type AlertType = 'warning' | 'success' | 'info' | 'error' | 'normal';
