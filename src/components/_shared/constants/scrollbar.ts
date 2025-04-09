import {
  getComponentSizeMap,
  getComponentDirectionMap,
} from '@shared/utils/compt';
// tackwidth
export const DEFAULT_TRACK_WIDTH = 15;
// barwidth
export const DEFAULT_BAR_WIDTH = 9;
// type
export const BAR_TYPE = {
  virtual: 'virtual',
  real: 'real',
};

// dirmap
export const TRACK_DIRECTION_MAP =
  getComponentDirectionMap('yc-scrollbar-track');
export const THUMB_DIRECTION_MAP =
  getComponentDirectionMap('yc-scrollbar-thumb');
