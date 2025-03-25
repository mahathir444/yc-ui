import { App } from 'vue';
import _Tag from './index.vue';
import { getComponentPrefix } from '@/components/_/utils/global-config';

export type TagInstance = InstanceType<typeof _Tag>;
export type { TagProps, TagSize } from './type';

const Tag = Object.assign(_Tag, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Tag.name, _Tag);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcTag: typeof Tag;
  }
}

export default Tag;
