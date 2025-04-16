import { App } from 'vue';
import _IconButton from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type IconButtonInstance = InstanceType<typeof _IconButton>;
export type { IconButtonProps } from './type';

const IconButton = Object.assign(_IconButton, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _IconButton.name, _IconButton);
  },
});

// 定义类型
declare module 'vue' {
  export interface GlobalComponents {
    YcIconButton: typeof IconButton;
  }
}

export default IconButton;
