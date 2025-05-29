import { App } from 'vue';
import _Typography from './Typography.vue';
import _TypographyTitle from './TypographyTitle.vue';
import _TypographyText from './TypographyText.vue';

export type TypographyInstance = InstanceType<typeof _Typography>;
export type TypographyTitleInstance = InstanceType<typeof _TypographyTitle>;
export type TypographyTextInstance = InstanceType<typeof _TypographyText>;
export * from './type';

const Typography = Object.assign(_Typography, {
  install: (app: App) => {
    app.component('Yc' + _Typography.name, _Typography);
    app.component('Yc' + _TypographyTitle.name, _TypographyTitle);
  },
});

export {
  _TypographyTitle as TypographyTitle,
  _TypographyText as TypographyText,
};

declare module 'vue' {
  export interface GlobalComponents {
    YcTypography: typeof Typography;
    YcTypographyTitle: typeof _TypographyTitle;
    YcTypographyText: typeof _TypographyText;
  }
}

export default Typography;
