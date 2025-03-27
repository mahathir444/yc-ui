import { computed, CSSProperties, toRefs } from 'vue';
import { IconProps, ObjectData, RequiredDeep } from '../type';

export default (props: ObjectData) => {
  const {
    size,
    spin,
    rotate,
    color,
    strokeLinecap,
    strokeLinejoin,
    strokeWidth,
  } = toRefs(props as RequiredDeep<IconProps>);
  const style = computed(() => {
    let width = '';
    let height = '';
    if (Array.isArray(size.value)) {
      width = size.value[0] + 'px';
      height = size.value[1] + 'px';
    } else {
      width = size.value ? size.value + 'px' : '1em';
      height = size.value ? size.value + 'px' : '1em';
    }
    return {
      color: color.value ? color.value : 'inherit',
      width,
      height,
      transform: rotate ? `rotate(${rotate.value}deg)` : 'unset',
    } as CSSProperties;
  });
  const className = computed(() => {
    return {
      'yc-icon': true,
      'yc-icon-spin': spin.value,
    };
  });
  const attrs = computed(() => {
    return {
      class: className.value,
      style: style.value,
      'stroke-width': strokeWidth.value,
      'stroke-linecap': strokeLinecap.value,
      'stroke-linejoin': strokeLinejoin.value,
    };
  });
  return {
    attrs,
  };
};
