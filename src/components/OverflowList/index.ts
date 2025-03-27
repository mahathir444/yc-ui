import { App } from 'vue';
import _OverflowList from './index.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type OverflowListInstance = InstanceType<typeof _OverflowList>;
export type { OverflowListProps } from './type';

const OverflowList = Object.assign(_OverflowList, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _OverflowList.name, _OverflowList);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcOverflowList: typeof OverflowList;
  }
}

export default OverflowList;
