import { SelectOptions } from '@/components/Select';
import { getComponentSizeMap } from '@shared/utils/compt';

export const SIZE_CLASS = getComponentSizeMap('yc-color-picker');

export const PRESET_COLORS = [
  '#00B42A',
  '#3C7EFF',
  '#FF7D00',
  '#F76965',
  '#F7BA1E',
  '#F5319D',
  '#D91AD9',
  '#9FDB1D',
  '#FADC19',
  '#722ED1',
  '#3491FA',
  '#7BE188',
  '#93BEFF',
  '#FFCF8B',
  '#FBB0A7',
  '#FCE996',
  '#FB9DC7',
  '#F08EE6',
  '#DCF190',
  '#FDFA94',
  '#C396ED',
  '#9FD4FD',
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
