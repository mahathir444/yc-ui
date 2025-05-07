export interface CommentProps {
  author?: string;
  avatar?: string;
  content?: string;
  datetime?: string;
  align?:
    | 'left'
    | 'right'
    | { datetime?: 'left' | 'right'; actions?: 'left' | 'right' };
}

export interface CommentSlots {
  avatar(): void;
  author(): void;
  datetime(): void;
  content(): void;
  actions(): void;
  default(): void;
}
