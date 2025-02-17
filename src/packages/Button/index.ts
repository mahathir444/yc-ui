import { App } from 'vue';
import _Button from './index.vue';
import { getComponentPrefix } from '@/utils/global-config';

export type ButonInstance = InstanceType<typeof _Button>;

const Button = Object.assign(_Button, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Button.name, _Button);
  },
});

export default Button;
