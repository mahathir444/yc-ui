import { App } from 'vue';
import _Button from './Button.vue';
import _ButtonGroup from './ButtonGroup.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type ButonInstance = InstanceType<typeof _Button>;
export type ButonGroupInstance = InstanceType<typeof _ButtonGroup>;
export type {
  ButtonHtmlType,
  ButtonProps,
  ButtonType,
  ButtonStatus,
  ButtonShape,
  ButtonGroupProps,
} from './type';

const Button = Object.assign(_Button, {
  buttongroup: _ButtonGroup,
  install: (app: App) => {
    app.component(getComponentPrefix() + _Button.name, _Button);
  },
});

export { _ButtonGroup as ButtonGroup };

export default Button;
