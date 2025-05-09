export interface ResultProps {
  status?: ResultStatus;
  title?: string;
  subtitle?: string;
}

export type ResultStatus =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | '403'
  | '404'
  | '500'
  | null;

export interface ResultSlots {
  icon(): void;
  title(): void;
  subtitle(): void;
  default(): void;
  extra(): void;
}
