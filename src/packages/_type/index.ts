import { RenderFunction } from 'vue';

export type Size = 'mini' | 'small' | 'medium' | 'large';

export type CloseType =
  | 'mask'
  | 'closeBtn'
  | 'cancelBtn'
  | 'confirmBtn'
  | 'esc'
  | '';

<<<<<<< HEAD
export type Fn = (...args: any) => any;
=======
export type RenderContent = string | RenderFunction;

export type ClassName =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];
>>>>>>> f7e68564cc962b7a25df852515cc9ed0ed39c386
