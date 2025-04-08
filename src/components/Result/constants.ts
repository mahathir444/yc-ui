import { TYPE_ICON_MAP, TYPE_ICON_COLOR_MAP } from '@shared/constants';
import { IconInfoLine, IconClose, IconCheck } from '@shared/icons';

export const RESULT_ICON_MAP: Record<string, any> = {
  info: IconInfoLine,
  warning: IconInfoLine,
  error: IconClose,
  success: IconCheck,
};

export const RESULT_ICON_COLOR_MAP = {
  ...TYPE_ICON_COLOR_MAP,
};
