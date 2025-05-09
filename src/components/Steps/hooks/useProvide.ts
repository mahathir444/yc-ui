import {
  useSlots,
  computed,
  ref,
  provide as _provide,
  inject as _inject,
  Ref,
  toRefs,
} from 'vue';
import { Props, Direction, RequiredDeep } from '@shared/type';
import { StepsProps as _StepsProps, StepsEmits } from '../type';
import { useControlValue } from '@/components/_shared/hooks';

export const STEPS_PROVIDE_KEY = 'card-props';

export interface StepsProvide {
  step: Ref<number>;
  computedCurrent: Ref<number>;
  lineLess: Ref<boolean>;
  labelPlacement: Ref<Direction>;
  direction: Ref<Direction>;
  statusArr: Ref<Ref<string>[]>;
}

type StepsProps = RequiredDeep<_StepsProps>;

export default () => {
  const provide = (props: Props, emits: StepsEmits) => {
    const { current, defaultCurrent, lineLess, labelPlacement, direction } =
      toRefs(props as StepsProps);
    // current
    const computedCurrent = useControlValue<number>(
      current,
      defaultCurrent.value,
      (val) => {
        emits('update:current', val);
      }
    );
    const statusArr = ref<Ref<string>[]>([]);
    const step = ref<number>(0);
    _provide<StepsProvide>(STEPS_PROVIDE_KEY, {
      step,
      computedCurrent,
      lineLess,
      labelPlacement,
      direction,
      statusArr,
    });
  };
  const inject = (props: Props) => {
    const { status: _status } = toRefs(props);
    const injection = _inject<StepsProvide>(STEPS_PROVIDE_KEY, {
      step: ref(0),
      computedCurrent: ref(0),
      lineLess: ref(false),
      labelPlacement: ref('horizontal'),
      direction: ref('horizontal'),
      statusArr: ref([]),
    });
    const { step, computedCurrent, statusArr } = injection;
    const curStep = ref(++step.value);
    // status
    statusArr.value[curStep.value - 1] = computed(() => {
      if (_status.value) {
        return _status.value;
      }
      if (curStep.value < computedCurrent.value) {
        return 'finish';
      } else if (curStep.value == computedCurrent.value) {
        return 'process';
      } else {
        return 'wait';
      }
    });
    return {
      curStep,
      ...injection,
    };
  };
  return {
    provide,
    inject,
  };
};
