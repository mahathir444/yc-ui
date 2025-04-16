import { App } from 'vue';
import _Space from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type SpaceInstance = InstanceType<typeof _Space>;
export * from './type';

const Space = Object.assign(_Space, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Space.name, _Space);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcSpace: typeof Space;
  }
}

export default Space;
