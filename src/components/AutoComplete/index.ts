import { App } from 'vue';
import _AutoComplete from './index.vue';
import { getComponentPrefix } from '@/components/_/utils/global-config';

export type AutoCompleteInstance = InstanceType<typeof _AutoComplete>;
export type { AutoCompleteProps } from './type';

const AutoComplete = Object.assign(_AutoComplete, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _AutoComplete.name, _AutoComplete);
  },
});

export default AutoComplete;
