import { TargetContainer } from '@shared/type';

export interface AffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  target?: TargetContainer;
  targetContainer?: TargetContainer;
}

export interface AffixSlot {
  default(): void;
}
