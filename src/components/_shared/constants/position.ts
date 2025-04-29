import { getComponentConstantsMap } from '../utils/compt';

export const TRIGGER_POSITION_MAP = getComponentConstantsMap(
  'yc-trigger',
  [
    'top',
    'tr',
    'tl',
    'bottom',
    'br',
    'bl',
    'left',
    'tr',
    'tb',
    'right',
    'rt',
    'rb',
  ],
  'position'
);

export const RESIZE_BOX_POSITION_MAP = [
  'left',
  'right',
  'top',
  'bottom',
] as const;

export const NOTIFICATION_POSITION = [
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
] as const;

export const DRAWER_PLACEMENT_MAP = getComponentConstantsMap(
  'yc-drawer',
  ['left', 'right', 'top', 'bottom'],
  'placement'
);

export const DIVIDER_POSITION_MAP = getComponentConstantsMap(
  'yc-divider-text',
  ['left', 'center', 'right'],
  'position'
);

export const ROW_JUSTIFY_MAP = getComponentConstantsMap(
  'yc-row',
  ['start', 'center', 'end', 'space-around', 'space-between'],
  'justify'
);

export const ROW_ALIGN_MAP = getComponentConstantsMap(
  'yc-row',
  ['start', 'center', 'end', 'stretch'],
  'align'
);

export const SPACE_ALIGN_MAP = getComponentConstantsMap(
  'yc-space',
  ['start', 'center', 'end', 'stretch'],
  'align'
);

export const DROPDOWN_POSITION_MAP: Record<string, string> = {
  top: 'top',
  tl: 'tl',
  tr: 'tr',
  bottom: 'bottom',
  bl: 'bl',
  br: 'br',
};

export const DSUBMENU_POSITION_MAP: Record<string, string> = {
  rt: 'rt',
  rb: 'rb',
};

export const DSUBMENU_TRIGGER_MAP: Record<string, string> = {
  click: 'click',
  hover: 'hover',
};

export const INDICATOR_POSITION_MAP = getComponentConstantsMap(
  'yc-carousel-indicator',
  ['left', 'right', 'top', 'bottom', 'outer'],
  'position'
);
