export interface OverflowListProps {
  min?: number;
  margin?: number;
  from?: 'start' | 'end';
}

export interface OverflowListEmits {
  change: (change: number) => void;
}
