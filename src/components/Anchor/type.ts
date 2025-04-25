import { ComputedRef, Ref } from 'vue';
import { TargetContainer } from '@shared/type';

export interface AnchorProps {
  boundary?: 'start' | 'end' | 'center' | 'nearest' | number;
  lineLess?: boolean;
  scrollContainer?: TargetContainer;
  changeHash?: boolean;
  smooth?: boolean;
}

export interface AnchorSlot {
  default(): void;
}

export interface AnchorLinkProps {
  title?: string;
  href?: string;
}

export interface AnchorLinkSlot {
  default(): void;
  sublist(): void;
}

export interface AnchorProvide {
  hrefs: Ref<string[]>;
  order: Ref<number>;
  changeHash: Ref<boolean>;
  smooth: Ref<boolean>;
  boundary: Ref<string | number>;
  lineLess: Ref<boolean>;
  curHref: Ref<string>;
  scrollContainer:
    | ComputedRef<HTMLElement | undefined>
    | Ref<HTMLElement | undefined>;
}
