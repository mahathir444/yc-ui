import { App, ref, h, render, reactive } from 'vue';
import _Notification from './Notification.vue';
import _NotificationList from './NotificationList.vue';
import {
  NotificationMethods,
  NotificationConfig,
  NotificationProps,
  NotificationType,
} from './type';
import { isString } from '@shared/utils';

export type NotificationInstance = InstanceType<typeof _Notification>;
export * from './type';

// Notification-container
let container: HTMLDivElement;
// 容器clas
let className = 'yc-overlay yc-overlay-Notification';
// NotificationId
let NotificationId = 1;
// meessage
const manager = reactive<Map<string, NotificationProps>>(new Map());
// 处理NotificationOpen
const open = (
  props: string | NotificationConfig,
  type: NotificationType = 'info'
) => {
  if (!container) {
    container = document.createElement('div');
    container.className = className;
    document.body.appendChild(container);
    render(
      h(_NotificationList, {
        NotificationList: NotificationList.value,
        position: isString(props) ? 'top' : props.position,
      }),
      container
    );
  }
  // 销毁
  const onDestory = () => {
    if (!manager.has(id)) return;
    manager.delete(id);
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
  // 查找是否存在
  if (manager.has(id)) {
    manager.set(id, {
      ...manager.get(id),
      ...notification,
    });
  } else {
    manager.set(id, notification);
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
  remove(id) {
    if (!manager.has(id)) return;
    manager.get(id)?.onClose?.(id);
    manager.delete(id);
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
