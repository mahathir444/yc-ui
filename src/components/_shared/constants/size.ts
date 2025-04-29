import { getComponentSizeMap } from '../utils/compt';

export const SIZE_MAP: Record<string, number> = {
  mini: 24,
  small: 28,
  medium: 32,
  large: 36,
};

export const BUTTON_SIZE_CLASS = getComponentSizeMap('yc-button');

export const COLOR_PICKER_SIZE_CLASS = getComponentSizeMap('yc-color-picker');

export const INPUT_TAG_SIZE_CLASS = getComponentSizeMap('yc-input-tag');

export const INPUT_SIZE_CLASS = getComponentSizeMap('yc-input');

export const INPUT_OUTER_SIZE_CLASS = getComponentSizeMap('yc-input-outer');

export const RADIO_SIZE_CLASS = getComponentSizeMap('yc-radio-button');

export const VERIFICATION_CODE_SIZE_CLASS = getComponentSizeMap(
  'yc-verification-code'
);

export const SKELETON_SHAPE_SIZE_CLASS = getComponentSizeMap(
  'yc-skeleton-shape',
  ['small', 'medium', 'large']
);

export const SWITCH_SIZE_CLASS = getComponentSizeMap('yc-switch', [
  'medium',
  'small',
]);

export const TAG_SIZE_CLASS = getComponentSizeMap('yc-tag', [
  'small',
  'medium',
  'large',
]);

export const CARD_SIZE_CLASS = getComponentSizeMap('yc-card', [
  'small',
  'medium',
]);
