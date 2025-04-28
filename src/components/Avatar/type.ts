import { CSSProperties } from 'vue';

export interface AvatarProps {
  shape?: 'square' | 'round';
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

export interface AvatarSlot {
  default(): void;
  ['trigger-icon'](): void;
}
