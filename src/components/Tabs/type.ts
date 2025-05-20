import { Direction, Size } from '@shared/type';

export interface TabProps {
  activeKey?: TabKey;
  defaultActiveKey?: TabKey;
  position?: 'left' | 'right' | 'bottom' | 'top';
  size?: Size;
  type?: 'line' | 'card' | 'card-gutter' | 'text' | 'rounded' | 'capsule';
  direction?: Direction;
  editable?: boolean;
  showAddButton?: boolean;
  destoryOnHide?: boolean;
  lazyLoad?: boolean;
  justify?: boolean;
  animation?: boolean;
  headerPadding?: boolean;
  autoSwitch?: boolean;
  hideContent?: boolean;
  trigger?: 'click' | 'hover';
  scrollPositon?: 'start' | 'end' | 'center' | 'auto' | number;
}

export interface TabEmits {
  (e: 'update:activeKey', value: TabKey): void;
  (e: 'change', value: TabKey): void;
  (e: 'tab-click', value: TabKey): void;
  (e: 'add'): void;
  (e: 'delete', value: TabKey): void;
}

export interface TabSlots {
  extra(): void;
  default(): void;
}

export interface TabPaneProps {
  title?: string;
  path?: TabKey;
  disabled?: boolean;
  closable?: boolean;
  destoryOnHide?: boolean;
}

export interface TabPaneSlots {
  default(): void;
  title(): void;
}

export type TabKey = string | number;
