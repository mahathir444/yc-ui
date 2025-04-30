import { App } from 'vue';
import _Image from './Image.vue';
import _ImagePreview from './ImagePreview.vue';
import _ImagePreviewAction from './ImagePreviewAction.vue';
export type ImageInstance = InstanceType<typeof _Image>;
export type ImagePreviewInstance = InstanceType<typeof _ImagePreview>;
export type ImagePreviewActionInstance = InstanceType<
  typeof _ImagePreviewAction
>;
export * from './type';

const Image = Object.assign(_Image, {
  install: (app: App) => {
    app.component('Yc' + _Image.name, _Image);
    app.component('Yc' + _ImagePreview.name, _ImagePreview);
    app.component('Yc' + _ImagePreviewAction.name, _ImagePreviewAction);
  },
});

export {
  _ImagePreview as ImagePreview,
  _ImagePreviewAction as ImagePreviewAction,
};

declare module 'vue' {
  export interface GlobalComponents {
    YcImage: typeof Image;
    YcImagePreview: typeof _ImagePreview;
    YcImagePreviewAction: typeof _ImagePreviewAction;
  }
}

export default Image;
