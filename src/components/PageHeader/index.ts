import { App } from 'vue';
import _PageHeader from './index.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type PageHeaderInstance = InstanceType<typeof _PageHeader>;
export * from './type';

const PageHeader = Object.assign(_PageHeader, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _PageHeader.name, _PageHeader);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcPageHeader: typeof PageHeader;
  }
}

export default PageHeader;
