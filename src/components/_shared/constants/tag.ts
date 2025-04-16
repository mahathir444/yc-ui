import {
  getComponentSizeMap,
  getComponentConstantsMap,
} from '@shared/utils/compt';

export const SIZE_CLASS = getComponentSizeMap('yc-tag', [
  'small',
  'medium',
  'large',
]);

export const COLOR_CLASS = getComponentConstantsMap(
  'yc-tag',
  [
    'default',
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magent',
    'gray',
    'white',
    'default',
  ],
  'color'
);
