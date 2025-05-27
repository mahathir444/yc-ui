import {
  ref,
  toRefs,
  provide as _provide,
  inject as _inject,
  Ref,
  computed,
  useSlots,
} from 'vue';
import { CarouselEmits, CarouselShowArrow } from '../type';
import {
  useControlValue,
  sleep,
  findComponentsFromVnodes,
} from '@shared/utils';
import { ClassName, Direction, Props } from '@shared/type';
import CarouselItem from '../CarouselItem.vue';

export const CAROUSEL_CONTEXT_KEY = 'carousel-context';

export type MoveType = 'positive' | 'negative';

export interface CarouselContext {
  length: Ref<number>;
  computedCurrent: Ref<number>;
  transitionTimingFunction: Ref<string>;
  animationName: Ref<'slide' | 'fade'>;
  moveType: Ref<MoveType>;
  preIndex: Ref<number>;
  moveSpeed: Ref<number>;
  direction: Ref<Direction>;
  showArrow: Ref<CarouselShowArrow>;
  arrowClass: Ref<ClassName>;
  getValidIndex: (...args: any) => any;
}

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
    const slots = useSlots();
    // 插槽元素
    const carouselItems = computed(() => {
      return findComponentsFromVnodes(
        slots.default?.() || [],
        CarouselItem.name as string
      );
    });
    const length = computed(() => {
      return carouselItems.value.length;
    });
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
      if (val < 0) {
        return length.value - 1;
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
    _provide<CarouselContext>(CAROUSEL_CONTEXT_KEY, {
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
      carouselItems,
      computedCurrent,
      length,
      autoPlay,
      slideTo,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<CarouselContext>(CAROUSEL_CONTEXT_KEY, {
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
  };
  return {
    provide,
    inject,
  };
};
