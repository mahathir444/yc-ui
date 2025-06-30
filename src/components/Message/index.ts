import { App, ref, h, render } from 'vue';
import _Message from './Message.vue';
import _MessageList from './MessageList.vue';
import {
  MessageMethod,
  MessageConfig,
  MessageProps,
  MessageType,
} from './type';
import { isString } from '../_shared/utils';

export type MessageInstance = InstanceType<typeof _Message>;
export * from './type';
// message-container
let container: HTMLDivElement;
// messageId
let messageId = 1;
// meessage
const messageList = ref<MessageProps[]>([]);
const Message = Object.assign(_Message, {
  install: (app: App) => {
    app.component('Yc' + _Message.name, _Message);
  },
  open(config: string | MessageConfig, type: MessageType = 'info') {
    if (!container) {
      container = document.createElement('div');
      container.className = 'yc-overlay yc-overlay-message';
      document.body.appendChild(container);
      render(
        h(_MessageList, {
          messageList: messageList.value,
          position: isString(config) ? 'top' : config.position,
        }),
        container
      );
    }
    // 销毁
    const onDestory = () => {
      const index = messageList.value.findIndex((item) => item.id == id);
      if (index == -1) return;
      messageList.value.splice(index, 1);
    };
    // messageId
    const id =
      isString(config) || !config.id
        ? '__yc_message_' + messageId++
        : config.id;
    // messageIndex
    const index = messageList.value.findIndex((message) => message.id == id);
    // 创建message对象
    const message = isString(config)
      ? { content: config, id, onDestory, type }
      : { ...config, id, onDestory, type };
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
  ...(Object.fromEntries(
    ['success', 'warning', 'error', 'info', 'loading', 'normal', 'clear'].map(
      (type) => {
        return [
          type,
          (config: string | MessageConfig) => {
            if (type == 'clear') {
              messageList.value = [];
            } else {
              Message.open(config, type);
            }
          },
        ];
      }
    )
  ) as MessageMethod),
});

declare module 'vue' {
  export interface GlobalComponents {
    YcMessage: typeof Message;
  }
}

export default Message;
