export const config = {
  containerId: 'ycServiceNotificationContainer',
};

export const notificationType = [
  'info',
  'warning',
  'success',
  'error',
] as const;

export const notificationPosition = [
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
] as const;
