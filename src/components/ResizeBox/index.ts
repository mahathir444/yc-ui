import { App } from 'vue';
import _ResizeBox from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type ResizeBoxInstance = InstanceType<typeof _ResizeBox>;

export type { ResizeBoxProps, DirectionType } from './type';

const ResizeBox = Object.assign(_ResizeBox, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _ResizeBox.name, _ResizeBox);
  },
});

export default ResizeBox;
