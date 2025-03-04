import { App, render, ref, createVNode, reactive, Ref } from 'vue';
import _Notification from './index.vue';
import { getComponentPrefix } from '@/packages/_utils/global-config';
import _NotificationContainer from './notificationList.vue';
import {
  NotificationConfig,
  NotificationPosition,
  NotificationType,
} from './type';
import { config, notificationPosition, notificationType } from './constants';
import { isString } from '../_utils/is';

export type MessageInstance = InstanceType<typeof _Notification>;
export type {
  NotificationConfig,
  NotificationPosition,
  NotificationType,
} from './type';

const notifManager = notificationPosition.reduce(
  (result, item) => {
    const list = ref<NotificationConfig[]>([]);
    result[item] = {
      id: 0,
      list,
    };
    return result;
  },
  {} as Record<
    NotificationPosition,
    {
      id: number;
      list: Ref<NotificationConfig[]>;
    }
  >
);
const onClose = async (id: string, pos: NotificationPosition) => {
  const targetItem = notifManager[pos].list.value.find(
    (item) => item.id === id
  );
  if (!targetItem) return;
  targetItem?.onClose?.(id);
  const i = notifManager[pos].list.value.findIndex((item) => item.id === id);
  notifManager[pos].list.value.splice(i, 1);
};

const createDiv = (pos: NotificationPosition) => {
  const id = config.containerId + '_' + pos;
  if (!document.getElementById(id)) {
    const listContainer = document.createElement('div');
    listContainer.id = id;
    document.body.append(listContainer);
    const vnode = createVNode(_NotificationContainer, {
      notificationList: notifManager[pos].list.value,
      onClose,
      position: pos,
    });
    render(vnode, listContainer);
  }
};

const add = (type: NotificationType, config: NotificationConfig) => {
  const { position = 'topRight' } = config;
  createDiv(position);
  const target = notifManager[position];
  const nowId = config?.id ?? '__yc_notification_' + target.id++;
  const existingIndex = target.list.value.findIndex(
    (item) => item.id === nowId
  );
  if (existingIndex !== -1) {
    Object.assign(target.list.value[existingIndex], {
      ...config,
      type,
      id: nowId,
      resetFlag: !target.list.value[existingIndex].resetFlag,
    });
  } else {
    target.list.value.push(reactive({ ...config, type, id: nowId }));
  }
  return {
    close: () => onClose(nowId, position),
  };
};

const notificationMethod = notificationType.reduce(
  (acc, type) => {
    acc[type] = (config: string | NotificationConfig) => {
      const calcCofig = isString(config) ? { content: config } : config;
      return add(type, calcCofig);
    };
    return acc;
  },
  {} as Record<
    NotificationType,
    (config: string | NotificationConfig) => {
      close: () => void;
    }
  >
);

const Message = Object.assign(_Notification, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Notification.name, _Notification);
  },
  clear: (pos?: NotificationPosition | undefined) => {
    if (!pos) {
      notificationPosition.forEach((item) => {
        notifManager[item].list.value.splice(0);
      });
      return;
    }
    if (!notifManager[pos]) return;
    notifManager[pos].list.value.splice(0);
  },
  ...notificationMethod,
});

export default Message;
