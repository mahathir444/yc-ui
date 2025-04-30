import {
  ref,
  toRefs,
  provide as _provide,
  inject as _inject,
  Reactive,
  Ref,
  WritableComputedRef,
  watch,
  onBeforeUnmount,
} from 'vue';
import { CarouselEmits, ShowArrow } from '../type';
import { sleep } from '@shared/utils';
import { useControlValue } from '@shared/hooks';
import { Direction } from '@shared/type';

export const CAROUSEL_PROVIDE_KEY = 'carousel-props';

export type MoveType = 'positive' | 'negative';

export interface CarouselProvide {
  length: Ref<number>;
  computedCurrent: Ref<number> | WritableComputedRef<number>;
  transitionTimingFunction: Ref<string>;
  animationName: Ref<'slide' | 'fade'>;
  moveType: Ref<MoveType>;
  preIndex: Ref<number>;
  moveSpeed: Ref<number>;
  direction: Ref<Direction>;
  showArrow: Ref<ShowArrow>;
  arrowClass: Ref<string>;
  getValidIndex: (...args: any) => any;
}

type Props = Reactive<Record<string, any>>;

export default () => {
  const provide = (props: Props, emits: CarouselEmits) => {
    const {
      current,
      defaultCurrent,
      transitionTimingFunction,
      animationName,
      moveSpeed,
      direction,
      showArrow,
      arrowClass,
      autoPlay,
    } = toRefs(props);
    // 图片所属的length
    const length = ref<number>(0);
    // 受控值
    const computedCurrent = useControlValue<number>(
      current,
      defaultCurrent.value,
      (val) => {
        emits('update:current', val);
      }
    );
    // 移动方向
    const moveType = ref<MoveType>('positive');
    // preIndex
    const preIndex = ref<number>(computedCurrent.value);
    // 动画计时器
    let timer: NodeJS.Timeout | null = null;
    // 获取合法的index
    const getValidIndex = (val: number) => {
      if (val == 0) {
        return length.value;
      }
      return val > length.value ? val % length.value : val;
    };
    // 滚动
    const slideTo = async (targetIndex: number) => {
      if (timer || targetIndex == computedCurrent.value) {
        return;
      }
      moveType.value =
        targetIndex > computedCurrent.value ? 'positive' : 'negative';
      preIndex.value = computedCurrent.value;
      computedCurrent.value = getValidIndex(targetIndex);
      emits('change', computedCurrent.value, preIndex.value, true);
      await sleep(moveSpeed.value);
      timer = null;
    };
    // 提供给子组件
    _provide<CarouselProvide>(CAROUSEL_PROVIDE_KEY, {
      length,
      computedCurrent,
      transitionTimingFunction,
      animationName,
      moveSpeed,
      direction,
      showArrow,
      arrowClass,
      moveType,
      preIndex,
      getValidIndex,
    });
    return {
      computedCurrent,
      length,
      autoPlay,
      slideTo,
    };
  };
  const inject = (isItem: boolean = false) => {
    // 接收的值
    const injection = _inject<CarouselProvide>(CAROUSEL_PROVIDE_KEY, {
      length: ref(0),
      computedCurrent: ref(1),
      transitionTimingFunction: ref('cubic-bezier(0.34, 0.69, 0.1, 1)'),
      animationName: ref('slide'),
      moveSpeed: ref(500),
      direction: ref('horizontal'),
      showArrow: ref('always'),
      arrowClass: ref(''),
      preIndex: ref(0),
      moveType: ref('positive'),
      getValidIndex: () => {},
    });
    const { length } = injection;
    // 自己的index
    const index = isItem ? ++length.value : 0;
    return {
      ...injection,
      index,
    };
  };
  return {
    provide,
    inject,
  };
};
