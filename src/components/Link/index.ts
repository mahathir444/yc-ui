import { App } from 'vue';
import _Link from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type LinkInstance = InstanceType<typeof _Link>;
export * from './type';

const Link = Object.assign(_Link, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Link.name, _Link);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcLink: typeof Link;
  }
}

export default Link;
