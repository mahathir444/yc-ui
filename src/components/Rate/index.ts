import { App } from 'vue';
import _Rate from './index.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type RateInstance = InstanceType<typeof _Rate>;
export type { RateProps } from './type';

const Rate = Object.assign(_Rate, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Rate.name, _Rate);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcRate: typeof Rate;
  }
}

export default Rate;
