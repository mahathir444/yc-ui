import { App } from 'vue';
import _Button from './index.vue';
import { getComponentPrefix } from '@/packages/_utils/global-config';

export type ButonInstance = InstanceType<typeof _Button>;
export type {
  ButtonHtmlType,
  ButtonProps,
  ButtonType,
  ButtonStatus,
  ButtonShape,
} from './type';

const Button = Object.assign(_Button, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Button.name, _Button);
  },
});

export default Button;
