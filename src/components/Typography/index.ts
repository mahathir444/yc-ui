import { App } from 'vue';
import _Typography from './Typography.vue';
import _TypographyTitle from './TypographyTitle.vue';

export type TypographyInstance = InstanceType<typeof _Typography>;
export type TypographyTitleInstance = InstanceType<typeof _TypographyTitle>;
export * from './type';

const Typography = Object.assign(_Typography, {
  install: (app: App) => {
    app.component('Yc' + _Typography.name, _Typography);
    app.component('Yc' + _TypographyTitle.name, _TypographyTitle);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcTypography: typeof Typography;
    YcTypographyTitle: typeof _TypographyTitle;
  }
}

export default Typography;
