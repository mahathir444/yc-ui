import { OnBeforeCancel, OnBeforeOk } from '@/components/Modal/type';
import { CloseType } from '../_type';
import { isBoolean } from '../_utils/is';
export default async (
  type: CloseType,
  onBeforeOk: OnBeforeOk,
  onBeforeCancel: OnBeforeCancel
) => {
  let isClose: boolean;
  if (type == 'confirmBtn') {
    isClose = await new Promise<boolean>(async (resolve) => {
      const closeFn = onBeforeOk(resolve);
      if (isBoolean(closeFn)) {
        return;
      }
      if (!(closeFn instanceof Promise)) {
        return;
      }
      const _isClose = await closeFn;
      if (!isBoolean(_isClose)) {
        return;
      }
      resolve(_isClose);
    });
  } else {
    isClose = onBeforeCancel();
  }
  return isClose;
};
