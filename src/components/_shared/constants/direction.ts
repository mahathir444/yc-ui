import {
  getComponentConstantsMap,
  getComponentDirectionMap,
} from '../utils/compt';

export const CHECKBOX_DIRECTION_MAP =
  getComponentDirectionMap('yc-checkbox-group');

export const DIVIDER_DIRECTION_MAP = getComponentDirectionMap('yc-divider');

export const RADIO_DIRECTION_MAP = getComponentDirectionMap('yc-radio-group');

export const SLIDER_DIRECTION_MAP = getComponentDirectionMap('yc-slider');

export const SPACE_DIRECTION_MAP = getComponentDirectionMap('yc-space');

export const SPLIT_DIRECTION_MAP = getComponentDirectionMap('yc-split');

export const MENU_DIRECTION_MAP = getComponentConstantsMap(
  'yc-menu',
  ['pop', 'vertical', 'horizontal'],
  'mode'
);

export const CAROUSEL_DIRECTION_MAP = getComponentDirectionMap('yc-carousel');

export const DESCRIPTIONS_DIRECTION_MAP = getComponentConstantsMap(
  'yc-descriptions',
  ['inline-vertical', 'inline-horizontal', 'vertical', 'horizontal'],
  'layout'
);

// 内部组件
export const TRACK_DIRECTION_MAP =
  getComponentDirectionMap('yc-scrollbar-track');

export const THUMB_DIRECTION_MAP =
  getComponentDirectionMap('yc-scrollbar-thumb');

export const TICKS_DIRECTION_MAP = getComponentDirectionMap('yc-slider-ticks');
