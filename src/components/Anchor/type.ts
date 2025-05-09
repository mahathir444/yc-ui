import { TargetContainer } from '@shared/type';

export interface AnchorProps {
  boundary?: 'start' | 'end' | 'center' | 'nearest' | number;
  lineLess?: boolean;
  scrollContainer?: TargetContainer;
  changeHash?: boolean;
  smooth?: boolean;
}

export interface AnchorSlots {
  default(): void;
}

export interface AnchorLinkProps {
  title?: string;
  href?: string;
}

export interface AnchorLinkSlots {
  default(): void;
  sublist(): void;
}
