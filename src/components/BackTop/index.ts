import { App } from 'vue';
import _BackTop from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type BackTopInstance = InstanceType<typeof _BackTop>;
export * from './type';

const BackTop = Object.assign(_BackTop, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _BackTop.name, _BackTop);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcBackTop: typeof BackTop;
  }
}

export default BackTop;
