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

// messageList
const topList = ref<MessageProps[]>([]);
const bottomList = ref<MessageProps[]>([]);
// message-container
let topContainer: HTMLDivElement;
let bottomContainer: HTMLDivElement;
// 容器clas
let className = 'yc-overlay yc-overlay-message';
// messageId
let messageId = 1;
// 创建container
const createContainer = (position: MessagePostion) => {
  if (
    (position == 'top' && topContainer) ||
    (position == 'bottom' && bottomContainer)
  ) {
    return;
  }
  const container = document.createElement('div');
  container.className = className;
  document.body.appendChild(container);
  render(
    h(_MessageList, {
      messageList: position == 'top' ? topList.value : bottomList.value,
      position,
    }),
    container
  );
  if (position == 'top') {
    topContainer = container;
  } else {
    bottomContainer = container;
  }
};
// 处理messageOpen
const open = (props: string | MessageConfig, type: MessageType = 'info') => {
  // 消息渲染的位置
  const position = isString(props) ? 'top' : (props.position ?? 'top');
  // messList
  const messageList = position == 'top' ? topList : bottomList;
  // 创建容器
  createContainer(position);
  // 销毁
  const onDestory = () => {
    const index = messageList.value.findIndex((item) => item.id == id);
    if (index == -1) return;
    messageList.value.splice(index, 1);
  };
  // messageId
  const id =
    isString(props) || !props.id ? '__yc_message_' + messageId++ : props.id;
  // 创建message对象
  const message = isString(props)
    ? { content: props, id, onDestory, type }
    : { ...props, id, onDestory, type };
  const index = messageList.value.findIndex((item) => item.id == id);
  // 查找是否存在
  if (index != -1) {
    messageList.value.push({
      ...messageList.value[index],
      ...messageList,
    });
  } else {
    messageList.value.push(message);
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
    const messageList = position == 'top' ? topList : bottomList;
    messageList.value.splice(0);
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
