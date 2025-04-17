import {
  getComponentConstantsMap,
  getComponentStatusMap,
} from '../utils/compt';

export const ALERT_TYPE_CLASS = getComponentConstantsMap('yc-alert', [
  'normal',
  'info',
  'success',
  'error',
  'warning',
]);

export const POPCONFIRM_TYPE_CLASS = getComponentConstantsMap('yc-popconfirm', [
  'info',
  'success',
  'warning',
  'error',
]);

export const NOFITICATION_TYPE = [
  'info',
  'warning',
  'success',
  'error',
] as const;

export const MESSAGE_TYPE = [
  'info',
  'warning',
  'success',
  'error',
  'loading',
  'normal',
] as const;

export const BUTTON_TYPE_CLASS = getComponentConstantsMap('yc-button', [
  'primary',
  'secondary',
  'dashed',
  'outline',
  'text',
]);

export const BUTTON_GROUP_TYPE_CLASS = getComponentConstantsMap(
  'yc-button-group',
  ['primary', 'secondary', 'dashed', 'outline', 'text']
);

// 内部组件
export const TICK_TYPE_CLASS = getComponentConstantsMap('yc-slider', [
  'dot',
  'tick',
  'mark',
]);

export const TICKS_TYPE_CLASS = getComponentConstantsMap('yc-slider', [
  'dots',
  'ticks',
  'marks',
]);

// status
export const BUTTON_STATUS_CLASS = getComponentStatusMap('yc-button');

export const BUTTON_GROUP_STAUTS_CLASS =
  getComponentStatusMap('yc-button-group');

export const LINK_STATUS_CLASS = getComponentStatusMap('yc-link');
