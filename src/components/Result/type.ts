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
