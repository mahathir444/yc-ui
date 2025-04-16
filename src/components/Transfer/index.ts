import { App } from 'vue';
import _Transfer from './index.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type TransferInstance = InstanceType<typeof _Transfer>;
export * from './type';

const Transfer = Object.assign(_Transfer, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Transfer.name, _Transfer);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcTransfer: typeof Transfer;
  }
}

export default Transfer;
