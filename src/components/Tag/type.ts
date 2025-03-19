export interface TagProps {
  color?: string;
  size?: TagSize;
  bordered?: boolean;
  visible?: boolean;
  defaultVisible?: boolean;
  loading?: boolean;
  closeable?: boolean;
  checkable?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  nowrap?: boolean;
  preventFocus?: boolean;
}

export type TagSize = 'small' | 'medium' | 'large';

//  内部使用
export type TagEventType = 'close' | 'check';
