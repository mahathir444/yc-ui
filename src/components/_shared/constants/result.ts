import { IconInfoLine, IconClose, IconCheck } from '@shared/icons';
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
