import { App, ref, h, render } from 'vue';
import _Message from './Message.vue';
import _MessageList from './MessageList.vue';
import { MessageMethod, MessageConfig, MessageProps } from './type';
import { isString } from '../_shared/utils';

export type MessageInstance = InstanceType<typeof _Message>;
export * from './type';

// message-container
let container: HTMLDivElement;
// messageId
let messageId = 1;
const messageList = ref<MessageProps[]>([]);
const Message = Object.assign(_Message, {
  install: (app: App) => {
    app.component('Yc' + _Message.name, _Message);
  },
  clear() {
    messageList.value = [];
  },
  open(config: string | MessageConfig) {
    if (!container) {
      container = document.createElement('div');
      container.className = 'yc-overlay yc-overlay-message';
      document.body.appendChild(container);
      const vnode = h(_MessageList, {
        messageList: messageList.value,
      });
      render(vnode, container);
    }
    // 销毁
    const onDestory = () => {
      const index = messageList.value.findIndex((item) => item.id == id);
      if (index == -1) return;
      messageList.value.splice(index, 1);
    };
    const id =
      isString(config) || !config.id
        ? '__yc_message_' + messageId++
        : config.id;
    const index = messageList.value.findIndex((message) => message.id == id);
    // 创建message对象
    const message = isString(config)
      ? { content: config, id, onDestory }
      : { ...config, id, onDestory };
    // 查找是否存在
    if (index != -1) {
      messageList.value[index] = {
        ...messageList.value[index],
        ...message,
      };
    } else {
      messageList.value.push(message);
    }
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcMessage: typeof Message;
  }
}

export default Message;
