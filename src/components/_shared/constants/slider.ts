import {
  getComponentDirectionMap,
  getComponentConstantsMap,
} from '@shared/utils/compt';

export const SLIDER_DIRECTION_MAP = getComponentDirectionMap('yc-slider');

export const TICK_TYPE_MAP = getComponentConstantsMap('yc-slider', [
  'dot',
  'tick',
  'mark',
]);

export const TICKS_TYPE_MAP = getComponentConstantsMap('yc-slider', [
  'dots',
  'ticks',
  'marks',
]);

export const TICKS_DIRECTION_MAP = getComponentDirectionMap('yc-slider-ticks');
