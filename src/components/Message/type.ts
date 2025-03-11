import { messageType } from './constants';
import { VNode } from 'vue';

export type MessageType = (typeof messageType)[number];

export interface MessageProps {
  content?: string;
  id?: string;
  showIcon?: boolean;
  closable?: boolean;
  duration?: number;
  resetOnHover?: boolean;
  type?: MessageType;
  resetFlag?: boolean;
}
export interface MessageConfig extends MessageProps {
  onClose?: (id: string) => void;
  icon?: () => VNode;
}

export type MessageList = MessageConfig[];

export interface MessageContainerProps {
  messageList: MessageList;
}
