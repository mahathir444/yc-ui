import { getComponentShapeMap } from '@shared/utils';

export const BUTTON_SHAPE_CLASS = getComponentShapeMap('yc-button');

export const BUTTON_GROUP_SHAPE_CLASS = getComponentShapeMap('yc-button-group');

export const SKELETON_SHAPE_CLASS = getComponentShapeMap('yc-skeleton-shape');

export const SWITCH_SHAPE_CLASS = getComponentShapeMap('yc-switch', [
  'circle',
  'round',
  'line',
]);

export const AVATAR_SHAPE_CLASS = getComponentShapeMap('yc-avatar', [
  'square',
  'round',
]);

export const INDICATOR_SHAPE_CLASS = getComponentShapeMap(
  'yc-carousel-indicator',
  ['line', 'dot', 'slider', 'never']
);
