import { App } from 'vue';
import _Popconfirm from './index.vue';
import { getComponentPrefix } from '@/utils/global-config';

export type PopconfirmInstance = InstanceType<typeof _Popconfirm>;
export type { PopconfirmProps } from './type';

const Popover = Object.assign(_Popconfirm, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Popconfirm.name, _Popconfirm);
  },
});

export default Popover;
