import {
  getComponentDirectionMap,
  getComponentConstantsMap,
} from '@shared/utils/compt';

export const DIRECTION_MAP = getComponentDirectionMap('yc-divider');

export const POSITION_MAP = getComponentConstantsMap(
  'yc-divider-text',
  ['left', 'center', 'right'],
  'position'
);
