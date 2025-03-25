import { App } from 'vue';
import _Link from './index.vue';
import { getComponentPrefix } from '@/components/_/utils/global-config';

export type LinkInstance = InstanceType<typeof _Link>;

export type { LinkProps, LinkStatus } from './type';

const Link = Object.assign(_Link, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Link.name, _Link);
  },
});

export default Link;
