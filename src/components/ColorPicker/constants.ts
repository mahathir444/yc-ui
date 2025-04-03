import { SelectOptions } from '@/components/Select';
import { getComponentSizeMap } from '@shared/utils/compt';

export const SIZE_CLASS = getComponentSizeMap('yc-color-picker');

export const PRESET_COLORS = [
  'rgb(0, 180, 42)',
  'rgb(60, 126, 255)',
  'rgb(60, 126, 255)',
  'rgb(255, 125, 0)',
  'rgb(247, 105, 101)',
  'rgb(247, 186, 30)',
  'rgb(245, 49, 157)',
  'rgb(217, 26, 217)',
  'rgb(159, 219, 29)',
  'rgb(250, 220, 25)',
  'rgb(250, 220, 25)',
  'rgb(114, 46, 209)',
  'rgb(52, 145, 250)',
  'rgb(123, 225, 136)',
  'rgb(147, 190, 255)',
  'rgb(255, 207, 139)',
  'rgb(251, 176, 167)',
  'rgb(252, 233, 150)',
  'rgb(251, 157, 199)',
  'rgb(251, 157, 199)',
  'rgb(220, 241, 144)',
  'rgb(253, 250, 148)',
  'rgb(195, 150, 237)',
  'rgb(159, 212, 253)',
];

export const FORMAT_OPTIONS: SelectOptions = [
  {
    label: 'RGB',
    value: 'rgb',
  },
  {
    label: 'Hex',
    value: 'hex',
  },
];
