export interface TagProps {
  color?: string;
  size?: 'small' | 'medium' | 'large';
  bordered?: boolean;
  visible?: boolean;
  defaultVisible?: boolean;
  loading?: boolean;
  closeable?: boolean;
  checkable?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  nowrap?: boolean;
  stopPropagation?: boolean;
  preventFocus?: boolean;
}
