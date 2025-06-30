import { App, ref, h, render } from 'vue';
import _Message from './Message.vue';
import _MessageList from './MessageList.vue';
import {
  MessageMethod,
  MessageConfig,
  MessageProps,
  MessageType,
} from './type';
import { isString } from '@shared/utils';

export type MessageInstance = InstanceType<typeof _Message>;
export * from './type';

// message-container
let container: HTMLDivElement;
// 容器clas
let className = 'yc-overlay yc-overlay-message';
// messageId
let messageId = 1;
// meessage
const messageList = ref<MessageProps[]>([]);
// 处理messageOpen
const open = (props: string | MessageConfig, type: MessageType = 'info') => {
  if (!container) {
    container = document.createElement('div');
    container.className = className;
    document.body.appendChild(container);
    render(
      h(_MessageList, {
        messageList: messageList.value,
        position: isString(props) ? 'top' : props.position,
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
    isString(props) || !props.id ? '__yc_message_' + messageId++ : props.id;
  // messageIndex
  const index = messageList.value.findIndex((message) => message.id == id);
  // 创建message对象
  const message = isString(props)
    ? { content: props, id, onDestory, type }
    : { ...props, id, onDestory, type };
  // 查找是否存在
  if (index != -1) {
    messageList.value[index] = {
      ...messageList.value[index],
      ...message,
    };
  } else {
    messageList.value.push(message);
  }
  return {
    close: onDestory,
  };
};
// message通用函数
const messageMethod = Object.fromEntries(
  ['success', 'warning', 'error', 'info', 'loading', 'normal', 'clear'].map(
    (type) => {
      return [
        type,
        (props: string | MessageConfig) => {
          if (type == 'clear') {
            messageList.value = [];
          } else {
            return open(props, type as MessageType);
          }
        },
      ];
    }
  )
) as MessageMethod;

const Message = Object.assign(_Message, {
  install: (app: App) => {
    app.config.globalProperties.$message = Object.assign(
      _Message,
      messageMethod
    );
  },
  ...messageMethod,
});

declare module 'vue' {
  export interface ComponentCustomProperties {
    $message: typeof Message;
  }
}

export default Message;
