export interface OverflowListProps {
  min?: number;
  margin?: number;
  from?: 'start' | 'end';
}

export interface OverflowListEmits {
  (e: 'change', value: number): void;
}
