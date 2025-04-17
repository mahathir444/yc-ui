import { App } from 'vue';
import _VerificationCode from './index.vue';
('Yc');

export type VerificationCodeInstance = InstanceType<typeof _VerificationCode>;
export * from './type';

const VerificationCode = Object.assign(_VerificationCode, {
  install: (app: App) => {
    app.component('Yc' + _VerificationCode.name, _VerificationCode);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcVerificationCode: typeof VerificationCode;
  }
}

export default VerificationCode;
