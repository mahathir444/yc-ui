import { App } from 'vue';
import _InputTag from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type InputTagInstance = InstanceType<typeof _InputTag>;
export type { TagData, InputTagProps, InputTagValue } from './type';

const InputTag = Object.assign(_InputTag, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _InputTag.name, _InputTag);
  },
});

export default InputTag;
