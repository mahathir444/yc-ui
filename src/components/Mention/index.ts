import { App } from 'vue';
import _Mention from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type MentionInstance = InstanceType<typeof _Mention>;
export * from './type';

const Mention = Object.assign(_Mention, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Mention.name, _Mention);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcMention: typeof Mention;
  }
}

export default Mention;
