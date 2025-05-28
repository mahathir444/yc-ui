export interface SpinProps {
  size?: number;
  loading?: boolean;
  dot?: boolean;
  tip?: string;
  hideIcon?: boolean;
  // 是否阻止焦点
  preventFocus?: boolean;
  isSizeInherit?: boolean;
}

export interface SpinSlots {
  default(): void;
  icon(): void;
  tip(): void;
}
