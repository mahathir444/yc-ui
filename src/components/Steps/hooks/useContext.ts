import {
  computed,
  ref,
  provide as _provide,
  inject as _inject,
  Ref,
  toRefs,
} from 'vue';
import { Props, Direction, RequiredDeep } from '@shared/type';
import {
  StepsProps as _StepsProps,
  StepsEmits,
  StepStatus,
  StepType,
} from '../type';
import { isUndefined, useControlValue } from '@shared/utils';

export const STEPS_CONTEXT_KEY = 'card-context';

export interface StepsContext {
  step: Ref<number>;
  computedCurrent: Ref<number>;
  lineLess: Ref<boolean>;
  direction: Ref<Direction>;
  labelPlacement: Ref<Direction>;
  statusArr: Ref<Ref<string>[]>;
  status: Ref<StepStatus>;
  small: Ref<boolean>;
  type: Ref<StepType>;
  changeable: Ref<boolean>;
  emits: StepsEmits;
}

type StepsProps = RequiredDeep<_StepsProps>;

export default () => {
  const provide = (props: Props, emits: StepsEmits) => {
    const {
      status,
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
    _provide<StepsContext>(STEPS_CONTEXT_KEY, {
      step,
      computedCurrent,
      lineLess,
      direction,
      status,
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
    const injection = _inject<StepsContext>(STEPS_CONTEXT_KEY, {
      step: ref(0),
      computedCurrent: ref(0),
      lineLess: ref(false),
      direction: ref('horizontal'),
      status: ref('process'),
      statusArr: ref([]),
      small: ref(false),
      type: ref('default'),
      changeable: ref(false),
      labelPlacement: ref('horizontal'),
      emits: () => {},
    });
    const {
      step,
      computedCurrent,
      statusArr,
      status: injectStatus,
    } = injection;
    const curStep = ref(++step.value);
    // status
    const status = computed(() => {
      if (!isUndefined(_status.value)) {
        return _status.value;
      }
      if (curStep.value < computedCurrent.value) {
        return 'finish';
      } else if (curStep.value == computedCurrent.value) {
        return injectStatus.value ?? 'process';
      } else {
        return 'wait';
      }
    });
    const nextStatus = computed(() => statusArr.value[curStep.value]?.value);
    statusArr.value[curStep.value - 1] = status;
    return {
      ...injection,
      curStep,
      status,
      nextStatus,
    };
  };
  return {
    provide,
    inject,
  };
};
