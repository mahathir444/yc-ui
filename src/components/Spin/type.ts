export interface SpinProps {
  size?: number;
  loading?: boolean;
  dot?: boolean;
  tip?: string;
  hideIcon?: boolean;
  preventFocus?: boolean;
  // 大小是否继承
  isSizeInherit: boolean;
}

export interface SpinSlots {
  default(): void;
  icon(): void;
  tip(): void;
}
