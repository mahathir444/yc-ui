import { App } from 'vue';
import _Popconfirm from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type PopconfirmInstance = InstanceType<typeof _Popconfirm>;
export type { PopconfirmProps, PopconfirmType } from './type';

const Popconfirm = Object.assign(_Popconfirm, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Popconfirm.name, _Popconfirm);
  },
});

export default Popconfirm;
