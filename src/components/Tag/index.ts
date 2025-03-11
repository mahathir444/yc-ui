import { App } from 'vue';
import _Tag from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type TagInstance = InstanceType<typeof _Tag>;
export type { TagProps } from './type';

const Tag = Object.assign(_Tag, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Tag.name, _Tag);
  },
});

export default Tag;
