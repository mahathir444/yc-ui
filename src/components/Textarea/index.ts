import { App } from 'vue';
import _Textarea from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type TextareaInstance = InstanceType<typeof _Textarea>;
export type { TextareaProps, TextareaResize } from './type';

const Textarea = Object.assign(_Textarea, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Textarea.name, _Textarea);
  },
});

export default Textarea;
