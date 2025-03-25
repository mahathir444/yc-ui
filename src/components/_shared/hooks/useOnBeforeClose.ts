import { OnBeforeCancel, OnBeforeOk } from '@/components/Modal/type';
import { CloseType } from '../type';
import { isBoolean } from '../utils/is';
export default async (
  type: CloseType,
  onBeforeOk: OnBeforeOk,
  onBeforeCancel: OnBeforeCancel
) => {
  const handleBeforeOk = () => {
    return new Promise<boolean>(async (resolve) => {
      const closeResult = onBeforeOk(resolve);
      let isClose = true;
      if (isBoolean(closeResult)) {
        isClose = closeResult;
      } else if (closeResult instanceof Promise) {
        try {
          const _isClose = await closeResult;
          if (isBoolean(_isClose)) {
            isClose = _isClose;
          }
        } catch {
          isClose = false;
        }
      }
      resolve(isClose);
    });
  };
  let isClose: boolean;
  if (type == 'confirmBtn') {
    isClose = await handleBeforeOk();
  } else {
    isClose = onBeforeCancel();
  }
  return isClose;
};
