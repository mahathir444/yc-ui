import { App, ref, h, render, reactive } from 'vue';
import _Notification from './Notification.vue';
import _NotificationList from './NotificationList.vue';
import {
  NotificationMethods,
  NotificationConfig,
  NotificationProps,
  NotificationType,
  NotificationPosition,
} from './type';
import { isString } from '@shared/utils';

export type NotificationInstance = InstanceType<typeof _Notification>;
export * from './type';

// Notification-container
const container = new Map<string, HTMLDivElement>();
// notificationList
const notificationList = reactive({
  topLeft: [] as NotificationProps[],
  topRight: [] as NotificationProps[],
  bottomLeft: [] as NotificationProps[],
  bottomRight: [] as NotificationProps[],
});
// 容器class
let className = 'yc-overlay yc-overlay-notification';
// NotificationId
let NotificationId = 1;
// 处理NotificationOpen
const open = (
  props: string | NotificationConfig,
  type: NotificationType = 'info'
) => {
  // 消息渲染的位置
  const position = isString(props)
    ? 'topRight'
    : (props.position ?? 'topRight');
  // 创建container
  if (!container.has(position)) {
    const notificationContainer = document.createElement('div');
    notificationContainer.className = className;
    document.body.appendChild(notificationContainer);
    container.set(position, notificationContainer);
    render(
      h(_NotificationList, {
        notificationList: notificationList[position],
        position: isString(props) ? 'top' : props.position,
      }),
      notificationContainer
    );
  }
  // 销毁
  const onDestory = () => {
    const index = notificationList[position].findIndex((item) => item.id == id);
    if (index == -1) {
      return;
    }
    notificationList[position].splice(index, 1);
  };
  // NotificationId
  const id =
    isString(props) || !props.id
      ? '__yc_Notification_' + NotificationId++
      : props.id;
  // 创建Notification对象
  const notification = isString(props)
    ? { content: props, id, onDestory, type }
    : { ...props, id, onDestory, type };
  const index = notificationList[position].findIndex((item) => item.id == id);
  // 查找是否存在
  if (index != -1) {
    notificationList[position].push({
      ...notificationList[position][index],
      ...notificationList,
    });
  } else {
    notificationList[position].push(notification);
  }
  return {
    close: onDestory,
  };
};
// Notification通用函数
const NotificationMethod = {
  ...Object.fromEntries(
    ['success', 'warning', 'error', 'info'].map((type) => {
      return [
        type,
        (props: string | NotificationConfig) => {
          return open(props, type as NotificationType);
        },
      ];
    })
  ),
  remove(id) {},
  clear(position: NotificationPosition) {
    notificationList[position].splice(0);
  },
} as NotificationMethods;

const Notification = Object.assign(_Notification, {
  install: (app: App) => {
    app.config.globalProperties.$notification = Object.assign(
      _Notification,
      NotificationMethod
    );
  },
  ...NotificationMethod,
});

declare module 'vue' {
  export interface ComponentCustomProperties {
    $notification: typeof Notification;
  }
}

export default Notification;
