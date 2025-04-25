export interface AlertProps {
  type?: AlertType;
  showIcon?: boolean;
  closable?: boolean;
  title?: string;
  banner?: boolean;
  center?: boolean;
}

export interface AlertEmits {
  (e: 'close', ev: MouseEvent): void;
  (e: 'afterClose'): void;
}

export interface AlertSlot {
  default(): void;
  icon(): void;
  title(): void;
  action(): void;
  closeElement(): void;
}

export type AlertType = 'warning' | 'success' | 'info' | 'error' | 'normal';
