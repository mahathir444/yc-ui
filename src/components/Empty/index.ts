import { App } from 'vue';
import _Empty from './index.vue';
('Yc');

export type EmptyInstance = InstanceType<typeof _Empty>;
export * from './type';

const Empty = Object.assign(_Empty, {
  install: (app: App) => {
    app.component('Yc' + _Empty.name, _Empty);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcEmpty: typeof Empty;
  }
}

export default Empty;
