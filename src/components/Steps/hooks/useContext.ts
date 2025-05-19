import {
  computed,
  ref,
  provide as _provide,
  inject as _inject,
  Ref,
  toRefs,
} from 'vue';
import { Props, Direction, RequiredDeep } from '@shared/type';
import { StepsProps as _StepsProps, StepsEmits, StepType } from '../type';
import { useControlValue } from '@shared/utils';

export const STEPS_PROVIDE_KEY = 'card-props';

export interface StepsProvide {
  step: Ref<number>;
  computedCurrent: Ref<number>;
  lineLess: Ref<boolean>;
  direction: Ref<Direction>;
  labelPlacement: Ref<Direction>;
  statusArr: Ref<Ref<string>[]>;
  small: Ref<boolean>;
  type: Ref<StepType>;
  changeable: Ref<boolean>;
  emits: StepsEmits;
}

type StepsProps = RequiredDeep<_StepsProps>;

export default () => {
  const provide = (props: Props, emits: StepsEmits) => {
    const {
      current,
      defaultCurrent,
      lineLess,
      labelPlacement: _labelPlacement,
      direction: _direction,
      small,
      type,
      changeable,
    } = toRefs(props as StepsProps);
    // current
    const computedCurrent = useControlValue<number>(
      current,
      defaultCurrent.value,
      (val) => {
        emits('update:current', val);
      }
    );
    // direction
    const direction = computed(() => {
      if (['default', 'dot'].includes(type.value)) {
        return _direction.value;
      } else {
        return 'horizontal';
      }
    });
    // labelPlacement
    const labelPlacement = computed(() => {
      if (type.value == 'default' && direction.value == 'horizontal') {
        return _labelPlacement.value;
      } else if (type.value == 'dot') {
        return direction.value == 'vertical' ? 'horizontal' : 'vertical';
      } else {
        return 'horizontal';
      }
    });
    // status
    const statusArr = ref<Ref<string>[]>([]);
    // step
    const step = ref<number>(0);
    _provide<StepsProvide>(STEPS_PROVIDE_KEY, {
      step,
      computedCurrent,
      lineLess,
      direction,
      statusArr,
      small,
      type,
      changeable,
      labelPlacement,
      emits,
    });
    return {
      direction,
      labelPlacement,
      type,
    };
  };
  const inject = (props: Props) => {
    const { status: _status } = toRefs(props);
    const injection = _inject<StepsProvide>(STEPS_PROVIDE_KEY, {
      step: ref(0),
      computedCurrent: ref(0),
      lineLess: ref(false),
      direction: ref('horizontal'),
      statusArr: ref([]),
      small: ref(false),
      type: ref('default'),
      changeable: ref(false),
      labelPlacement: ref('horizontal'),
      emits: () => {},
    });
    const { step, computedCurrent, statusArr } = injection;
    const curStep = ref(++step.value);
    // status
    const status = computed(() => {
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
    const nextStatus = computed(() => statusArr.value[curStep.value]?.value);
    statusArr.value[curStep.value - 1] = status;
    return {
      curStep,
      status,
      nextStatus,
      ...injection,
    };
  };
  return {
    provide,
    inject,
  };
};
