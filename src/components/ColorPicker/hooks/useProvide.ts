import {
  ref,
  toRefs,
  WritableComputedRef,
  Ref,
  provide as _provide,
  inject as _inject,
  Reactive,
} from 'vue';
import { RequiredDeep } from '@shared/type';
import { ColorPickerProps, ColorPickerEmits, ColorFormat } from '../type';
import { parseColor } from '@shared/utils';
import { useControlValue, useConfigProvder } from '@shared/hooks';

export const COLOR_PICKER_PROVIDE_KEY = 'color-picker-props';

export type ColorPickerProvide = {
  props?: ColorPickerPropsRequired;
  emits: ColorPickerEmits;
  popupVisible: Ref<boolean>;
  computedColor: WritableComputedRef<string> | Ref<string>;
  baseColor: Ref<string>;
  format: WritableComputedRef<ColorFormat> | Ref<ColorFormat>;
  alpha: Ref<number>;
};

export type ColorPickerPropsRequired = RequiredDeep<ColorPickerProps>;

type Props = Reactive<Record<string, any>>;

export default () => {
  const provide = (props: Props, emits: ColorPickerEmits) => {
    const { modelValue, defaultValue, format: _format } = toRefs(props);
    // 获取全局配置
    const { size } = useConfigProvder(props);
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
    _provide<ColorPickerProvide>(COLOR_PICKER_PROVIDE_KEY, {
      props: props as ColorPickerPropsRequired,
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
    return _inject<ColorPickerProvide>(COLOR_PICKER_PROVIDE_KEY, {
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
