import { ref, toRefs, Ref, provide as _provide, inject as _inject } from 'vue';
import { RequiredDeep, Props } from '@shared/type';
import {
  ColorPickerProps as _ColorPickerProps,
  ColorPickerEmits,
  ColorFormat,
} from '../type';
import { useControlValue, parseColor, getGlobalConfig } from '@shared/utils';

export const COLOR_PICKER_PROVIDE_KEY = 'color-picker-context';
export type ColorPickerContext = {
  props: Props;
  emits: ColorPickerEmits;
  popupVisible: Ref<boolean>;
  computedColor: Ref<string>;
  baseColor: Ref<string>;
  format: Ref<ColorFormat>;
  alpha: Ref<number>;
};
export type ColorPickerProps = RequiredDeep<_ColorPickerProps>;

export default () => {
  const provide = (props: Props, emits: ColorPickerEmits) => {
    const {
      modelValue,
      defaultValue,
      format: _format,
    } = toRefs(props as ColorPickerProps);
    // 获取全局配置
    const { size } = getGlobalConfig(props);
    // 当前的format
    const format = useControlValue<string>(ref(undefined), _format.value);
    // 透明度
    const alpha = ref<number>(100);
    // 控制值
    const computedColor = useControlValue<string>(
      modelValue,
      defaultValue.value,
      (val) => {
        emits('update:modelValue', val);
        emits('change', val);
      },
      (val) => {
        const color = parseColor(val);
        const a = color.getAlpha();
        if (a != alpha.value) {
          alpha.value = a * 100;
        }
        if (format.value == 'hex') {
          return a == 1 ? color.toHexString() : color.toHex8String();
        } else {
          return color.toRgbString();
        }
      }
    );
    // 基础颜色
    const baseColor = ref<string>(computedColor.value);
    // visible
    const popupVisible = ref<boolean>(false);
    // 提供属性
    _provide<ColorPickerContext>(COLOR_PICKER_PROVIDE_KEY, {
      props,
      emits,
      popupVisible,
      computedColor,
      baseColor,
      alpha,
      format,
    });
    return {
      popupVisible,
      size,
      computedColor,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<ColorPickerContext>(COLOR_PICKER_PROVIDE_KEY, {
      props: {},
      emits: () => {},
      popupVisible: ref(false),
      computedColor: ref(''),
      baseColor: ref(''),
      alpha: ref(100),
      format: ref('hex'),
    });
  };
  return {
    provide,
    inject,
  };
};
