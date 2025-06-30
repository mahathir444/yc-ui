import { App } from 'vue';
import _Message from './Message.vue';
import { MessageMethod } from './type';

export type MessageInstance = InstanceType<typeof _Message>;
export * from './type';

let messageContainer;

const Message = Object.assign(_Message, {
  install: (app: App) => {
    app.component('Yc' + _Message.name, _Message);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcMessage: typeof Message;
  }
}

export default Message;
