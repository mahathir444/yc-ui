import { App } from 'vue';
import _Alert from './index.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type AlertInstance = InstanceType<typeof _Alert>;
export * from './type';

const Alert = Object.assign(_Alert, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Alert.name, _Alert);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcAlert: typeof Alert;
  }
}

export default Alert;
