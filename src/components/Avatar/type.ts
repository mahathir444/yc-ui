import { CSSProperties } from 'vue';
import { TriggerProps } from '../Trigger';

export interface AvatarProps {
  shape?: AvatarShape;
  imageUrl?: string;
  size?: number;
  autoFixFontSize?: boolean;
  triggerType?: 'mask' | 'button';
  triggerIconStyle?: CSSProperties;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

export interface AvatarEmits {
  (e: 'click', ev: MouseEvent): void;
  (e: 'error'): void;
  (e: 'load'): void;
}

export interface AvatarSlots {
  default(): void;
  ['trigger-icon'](): void;
}

export interface AvatarGroupProps {
  shape?: AvatarShape;
  size?: number;
  autoFixFontSize?: boolean;
  maxCount?: number;
  zIndexAscend?: boolean;
  maxStyle?: CSSProperties;
  maxPopoverTriggerProps?: TriggerProps;
}

export interface AvatarGroupSlots {
  default(): void;
}

export type AvatarShape = 'square' | 'round';
