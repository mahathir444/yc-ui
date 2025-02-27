import { TriggerProps } from '../Trigger/type';
import { ButtonProps } from '@/packages/Button/type';

export interface PopconfirmProps extends TriggerProps {
  content?: string;
  okText?: string;
  cancelText?: string;
  okLoading?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}
