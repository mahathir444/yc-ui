import { App, render, ref, createVNode, reactive } from 'vue';
import _Message from './Message.vue';
import _MessageContainer from './Container.vue';
import { MessageConfig, MessageList, MessageType } from './type';
import { config, messageType } from './constants';
import { getComponentPrefix } from '@shared/utils/global-config';

export type MessageInstance = InstanceType<typeof _Message>;
export type {
  MessageProps,
  MessageConfig,
  MessageList,
  MessageContainerProps,
} from './type';

const messageList = ref<MessageList>([]);
let id = 0;

const onClose = async (id: string) => {
  const targetItem = messageList.value.find((item) => item.id === id);
  if (!targetItem) return;
  targetItem?.onClose?.(id);
  const i = messageList.value.findIndex((item) => item.id === id);
  messageList.value.splice(i, 1);
};

const createDiv = () => {
  if (!document.getElementById(config.containerId)) {
    const messageContainer = document.createElement('div');
    messageContainer.id = config.containerId;
    document.body.append(messageContainer);
    const vnode = createVNode(_MessageContainer, {
      messageList: messageList.value,
      onClose,
    });
    render(vnode, messageContainer);
  }
};

const openMessage = (type: MessageType, config: MessageConfig) => {
  createDiv();
  const nowId = config?.id ?? '__yc_message_' + id++;
  const existingIndex = messageList.value.findIndex(
    (item) => item.id === nowId
  );
  if (existingIndex !== -1) {
    Object.assign(messageList.value[existingIndex], {
      ...config,
      type,
      id: nowId,
      resetFlag: !messageList.value[existingIndex].resetFlag,
    });
  } else {
    messageList.value.push(reactive({ ...config, type, id: nowId }));
  }
  return {
    close: () => onClose(nowId),
  };
};

const messageMethod = messageType.reduce(
  (acc, type) => {
    acc[type] = (config: MessageConfig) => openMessage(type, config);
    return acc;
  },
  {} as Record<
    MessageType,
    (config: MessageConfig) => {
      close: () => void;
    }
  >
);

const Message = Object.assign(_Message, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Message.name, _Message);
  },
  clear: () => {
    messageList.value.splice(0);
  },
  ...messageMethod,
});

export default Message;
