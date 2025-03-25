import { App } from 'vue';
import _Button from './Button.vue';
import _ButtonGroup from './ButtonGroup.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type ButonInstance = InstanceType<typeof _Button>;
export type ButonGroupInstance = InstanceType<typeof _ButtonGroup>;
export type {
  ButtonProps,
  ButtonGroupProps,
  ButtonHtmlType,
  ButtonType,
  ButtonStatus,
  ButtonShape,
} from './type';

const Button = Object.assign(_Button, {
  buttongroup: _ButtonGroup,
  install: (app: App) => {
    app.component(getComponentPrefix() + _Button.name, _Button);
    app.component(getComponentPrefix() + _ButtonGroup.name, _ButtonGroup);
  },
});
export { _ButtonGroup as ButtonGroup };

declare module 'vue' {
  export interface GlobalComponents {
    YcButton: typeof Button;
    YcButtonGroup: typeof _ButtonGroup;
  }
}

export default Button;
