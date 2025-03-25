import { App } from 'vue';
import _Empty from './index.vue';
import { getComponentPrefix } from '@/components/_/utils/global-config';

export type EmptyInstance = InstanceType<typeof _Empty>;
export type { EmptyProps } from './type';

const Empty = Object.assign(_Empty, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Empty.name, _Empty);
  },
});

export default Empty;
