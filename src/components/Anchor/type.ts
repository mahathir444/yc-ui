export interface AnchorProps {
  boundary?: 'start' | 'end' | 'center' | 'nearest' | number;
  lineLess?: boolean;
  scrollContainer?: string | HTMLElement;
  changeHash?: boolean;
  smooth?: boolean;
}
export interface AnchorLinkProps {
  title?: string;
  href?: string;
}
