export interface PageHeaderProp {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
}

export interface PageHeaderEmits {
  (e: 'back', ev: Event): void;
}
