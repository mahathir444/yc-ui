import { App } from 'vue';
import _Affix from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type AffixInstance = InstanceType<typeof _Affix>;
export * from './type';

const Affix = Object.assign(_Affix, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Affix.name, _Affix);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcAffix: typeof Affix;
  }
}

export default Affix;
