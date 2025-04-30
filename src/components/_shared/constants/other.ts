import { getComponentConstantsMap, getComponentThemeMap } from '../utils';
import {
  IconInfo,
  IconWarning,
  IconError,
  IconSuccess,
  IconLoading,
  IconInfoLine,
  IconClose,
  IconCheck,
} from '@shared/icons';
import Icon403 from '@shared/icons/Icon403.svg';
import Icon404 from '@shared/icons/Icon404.svg';
import Icon500 from '@shared/icons/Icon500.svg';

export const RESULT_ICON_MAP: Record<string, any> = {
  info: IconInfoLine,
  warning: IconInfoLine,
  error: IconClose,
  success: IconCheck,
  403: Icon403,
  404: Icon404,
  500: Icon500,
};

// icon映射
export const TYPE_ICON_MAP: Record<string, any> = {
  success: IconSuccess,
  warning: IconWarning,
  error: IconError,
  info: IconInfo,
  loading: IconLoading,
};

export const TYPE_ICON_COLOR_MAP: Record<string, string> = {
  info: 'rgb(22, 93, 255)',
  success: ' rgb(0, 180, 42)',
  warning: 'rgb(255, 125, 0)',
  error: 'rgb(245, 63, 63)',
  loading: 'rgb(22, 93, 225)',
  normal: 'rgb(201,205,212)',
};

export const TICK_TYPE_CLASS = getComponentConstantsMap('yc-slider', [
  'dot',
  'tick',
  'mark',
]);

export const TICKS_TYPE_CLASS = getComponentConstantsMap('yc-slider', [
  'dots',
  'ticks',
  'marks',
]);

export const MENU_THEME_MAP = getComponentThemeMap('yc-menu');

export const MENU_ITEM_THEME_MAP = getComponentThemeMap('yc-menu-item');

export const CAROUSEL_ANIMATION_CLASS = getComponentConstantsMap(
  'yc-carousel',
  ['slide', 'fade', 'card'],
  'animation'
);
