import { App } from 'vue';
import _Mention from './index.vue';
('Yc');

export type MentionInstance = InstanceType<typeof _Mention>;
export * from './type';

const Mention = Object.assign(_Mention, {
  install: (app: App) => {
    app.component('Yc' + _Mention.name, _Mention);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcMention: typeof Mention;
  }
}

export default Mention;
