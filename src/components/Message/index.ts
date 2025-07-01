import { App, ref, reactive, h, render } from 'vue';
import _Message from './Message.vue';
import _MessageList from './MessageList.vue';
import {
  MessageMethod,
  MessageConfig,
  MessageProps,
  MessageType,
  MessagePostion,
} from './type';
import { isString } from '@shared/utils';

export type MessageInstance = InstanceType<typeof _Message>;
export * from './type';

// message-container
const container = new Map<string, HTMLDivElement>();
// messageList
const messageList = reactive({
  top: [] as MessageProps[],
  bottom: [] as MessageProps[],
});
// 容器clas
let className = 'yc-overlay yc-overlay-message';
// messageId
let messageId = 1;
// 处理messageOpen
const open = (props: string | MessageConfig, type: MessageType = 'info') => {
  // 消息渲染的位置
  const position = isString(props) ? 'top' : (props.position ?? 'top');
  // 创建容器
  if (!container.has(position)) {
    const messageContainer = document.createElement('div');
    messageContainer.className = className;
    document.body.appendChild(messageContainer);
    container.set(position, messageContainer);
    render(
      h(_MessageList, {
        messageList: messageList[position],
        position,
      }),
      messageContainer
    );
  }
  // 销毁
  const onDestory = () => {
    const index = messageList[position].findIndex((item) => item.id == id);
    if (index == -1) {
      return;
    }
    messageList[position].splice(index, 1);
  };
  // messageId
  const id =
    isString(props) || !props.id ? '__yc_message_' + messageId++ : props.id;
  // 创建message对象
  const message = isString(props)
    ? { content: props, id, onDestory, type }
    : { ...props, id, onDestory, type };
  const index = messageList[position].findIndex((item) => item.id == id);
  // 查找是否存在
  if (index != -1) {
    messageList[position].push({
      ...messageList[position][index],
      ...messageList,
    });
  } else {
    messageList[position].push(message);
  }
  return {
    close: onDestory,
  };
};
// message通用函数
const messageMethod = {
  ...Object.fromEntries(
    ['success', 'warning', 'error', 'info', 'loading', 'normal'].map((type) => {
      return [
        type,
        (props: string | MessageConfig) => {
          return open(props, type as MessageType);
        },
      ];
    })
  ),
  clear(position: MessagePostion) {
    messageList[position].splice(0);
  },
} as MessageMethod;

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
