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

// status
export const BUTTON_STATUS_CLASS = getComponentStatusMap('yc-button');

export const BUTTON_GROUP_STAUTS_CLASS =
  getComponentStatusMap('yc-button-group');

export const LINK_STATUS_CLASS = getComponentStatusMap('yc-link');

export const BADGE_STATUS_CLASS = getComponentStatusMap('yc-badge', [
  'normal',
  'processing',
  'success',
  'warning',
  'danger',
]);

export const STEP_STATUS_CLASS = getComponentConstantsMap('yc-steps-item', [
  'finish',
  'process',
  'wait',
  'error',
]);

export const STEP_TYPE_CLASS = getComponentConstantsMap(
  'yc-steps-item',
  ['default', 'dot', 'arrow', 'navigation'],
  'mode'
);

export const STEP_NEXT_STATUS_CLASS = getComponentConstantsMap(
  'yc-steps-item-next',
  ['finish', 'process', 'wait', 'error']
);
