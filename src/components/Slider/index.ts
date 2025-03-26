import { App } from 'vue';
import _Slider from './index.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type SliderInstance = InstanceType<typeof _Slider>;
export type { SliderProps, PositionData, RangeData } from './type';

const Slider = Object.assign(_Slider, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Slider.name, _Slider);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcSlider: typeof Slider;
  }
}

export default Slider;
