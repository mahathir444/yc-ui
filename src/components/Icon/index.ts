import { App, h } from 'vue';
import _Icon from './index.vue';
import { IconFontOptions } from './type';
import { isServerRendering } from '@shared/utils/vue-utils';
import { getComponentPrefix } from '@shared/utils/global-config';

export type IconInstance = InstanceType<typeof _Icon>;
export type { IconProps, IconFontOptions } from './type';

const Icon = Object.assign(_Icon, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Icon.name, _Icon);
  },
  urlCache: new Map<string, string>(),
  addFromIconFontCn(options: IconFontOptions) {
    const { src, extraProps = {} } = options;
    if (src?.length && !isServerRendering && !this.urlCache.has(src)) {
      const script = document.createElement('script');
      script.setAttribute('src', src);
      script.setAttribute('data-namespace', src);
      document.body.appendChild(script);
      this.urlCache.set(src, src);
    }
    return h(_Icon, {
      ...extraProps,
    });
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcIcon: typeof Icon;
  }
}

export default Icon;
