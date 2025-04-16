import { App } from 'vue';
import _AutoComplete from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type AutoCompleteInstance = InstanceType<typeof _AutoComplete>;
export * from './type';

const AutoComplete = Object.assign(_AutoComplete, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _AutoComplete.name, _AutoComplete);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcAutoComplete: typeof AutoComplete;
  }
}

export default AutoComplete;
