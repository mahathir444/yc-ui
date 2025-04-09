import {
  getComponentStatusMap,
  getComponentConstantsMap,
  getComponentShapeMap,
  getComponentSizeMap,
} from '@shared/utils/compt';
// button
export const SIZE_CLASS = getComponentSizeMap('yc-button');

export const SHAPE_CLASS = getComponentShapeMap('yc-button');

export const TYPE_CLASS = getComponentConstantsMap('yc-button', [
  'primary',
  'secondary',
  'dashed',
  'outline',
  'text',
]);

export const STATUS_CLASS = getComponentStatusMap('yc-button');

// button-group
export const GROUP_SHAPE_CLASS = getComponentShapeMap('yc-button-group');

export const GROUP_TYPE_CLASS = getComponentConstantsMap('yc-button-group', [
  'primary',
  'secondary',
  'dashed',
  'outline',
  'text',
]);

export const GROUP_STAUTS_CLASS = getComponentStatusMap('yc-button-group');
