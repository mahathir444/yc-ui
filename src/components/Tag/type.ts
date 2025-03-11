import { Size } from '../_type';

export interface TagProps {
  color?: string;
  size?: 'small' | 'medium' | 'large';
  bordered?: boolean;
  visible?: boolean;
  defaultVisible?: boolean;
  loading?: boolean;
  closable?: boolean;
  checkable?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  nowrap?: boolean;
  value?: string;
}
