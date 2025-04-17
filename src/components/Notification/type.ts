import { ClassName, RenderContent } from '@shared/type';
import { NOTIFICATION_POSITION, NOFITICATION_TYPE } from '@shared/constants';
import { CSSProperties, RenderFunction } from 'vue';

export interface NotificationProps {
  id?: string;
  type?: NotificationType;
  showIcon?: boolean;
  closable?: boolean;
  duration?: number;
  resetFlag?: boolean;
}

export interface NotificationConfig extends NotificationProps {
  onClose?: (id: string) => void;
  icon?: RenderFunction;
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  footer?: RenderFunction;
  closeIcon?: RenderFunction;
  style?: CSSProperties;
  class?: ClassName;
  content?: RenderContent;
  title?: RenderContent;
}

export interface NotificationReturn {
  close: () => void;
}
export type NotificationType = (typeof NOFITICATION_TYPE)[number];
export type NotificationPosition = (typeof NOTIFICATION_POSITION)[number];
