<!-- 时间选择器 -->
<template>
  <yc-trigger
    v-bind="triggerProps"
    :position="position"
    trigger="click"
    animation-name="slide-dynamic-origin"
    v-model:popup-visible="cVisible"
    prevent-focus
    :popup-offset="4"
    :unmount-on-close="unmountOnClose"
  >
    <div
      :class="{
        'yc-time-picker-box': true,
        focus: cVisible,
        'time-range': type === 'time-range',
        disabled,
        error,
      }"
      :style="{
        height: SIZE_MAP[size] + 'px',
      }"
      @click="!disabled && hanClickBox()"
    >
      <div class="yc-input-box" @click="activeIndex = 0">
        <input
          :ref="inputRefs.set"
          class="yc-picker-input"
          :placeholder="computedPlaceHolder[0]"
          :value="showValue[0]"
          @input="hanInput"
          :disabled="disabled"
          :readonly="readonly"
        />
      </div>
      <span
        v-if="type === 'time-range'"
        class="yc-picker-separator"
        @click.stop=""
        >-</span
      >
      <div
        class="yc-input-box"
        v-if="type === 'time-range'"
        @click="activeIndex = 1"
      >
        <input
          :ref="inputRefs.set"
          class="yc-picker-input"
          :placeholder="computedPlaceHolder[1]"
          :value="showValue[1]"
          @input="hanInput"
          :disabled="disabled"
          :readonly="readonly"
        />
      </div>
      <div
        :class="{
          'yc-picker-suffix': true,
          allowClear: allowClear && !readonly && !disabled,
        }"
        @click.stop=""
      >
        <div class="yc-time-icon">
          <slot name="suffix-icon">
            <IconTime :size="14" />
          </slot>
        </div>
        <IconButton
          :size="14"
          class="yc-close-icon"
          @click="hanClear"
          v-if="allowClear && !readonly && !disabled"
        />
      </div>
    </div>
    <template #content>
      <div class="yc-picker-box">
        <div class="yc-picker-content">
          <div v-for="item in timeOptions" :key="item.key" class="yc-time-col">
            <YcScrollbar
              :vertical-thumb-width="6"
              :vertical-track-width="8"
              auto-fill
              :ref="(el: any) => setScrollRef(item.key, el)"
            >
              <div class="yc-time-list">
                <div
                  :class="{
                    'yc-time-item': true,
                    active: inputValue[activeIndex][item.key] === t.value,
                    disabled: t.disabled,
                  }"
                  v-for="t in item.options"
                  :key="t.value"
                  :ref="(el) => setItemRef(item.key, t.value, el)"
                  @click="!t.disabled && hanSelectItem(item.key, t.value)"
                >
                  {{ t.value }}
                </div>
              </div>
            </YcScrollbar>
          </div>
        </div>
        <div class="yc-picker-footer-extra" v-if="$slots.extra">
          <slot name="extra" />
        </div>
        <div class="yc-picker-footer">
          <YcButton size="mini" @click="setNow" :disabled="readonly">
            此刻
          </YcButton>
          <YcButton
            :disabled="disabledConfirm"
            type="primary"
            size="mini"
            @click="confirm"
            v-if="!disableConfirm"
          >
            确定
          </YcButton>
        </div>
      </div>
    </template>
  </yc-trigger>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, watch, nextTick } from 'vue';
import { TimePickerProps, TimePickerEmits } from './type';
import YcTrigger from '../Trigger/index.vue';
import { SIZE_MAP } from '@shared/constants';
import { isArray, isString, isUndefined } from '@shared/utils';
import YcButton from '@/components/Button/Button.vue';
import {
  generateTimeOptions,
  parseTimeStrByFormat,
  timeObjToStr,
  getGlobalConfig,
} from '@shared/utils';
import YcScrollbar from '@/components/Scrollbar/Scrollbar.vue';
import { useTemplateRefsList } from '@vueuse/core';
import { useControlValue } from '@shared/utils';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import BTween from 'b-tween';
import { IconButton, PreventFocus } from '@shared/components';
import { IconTime } from '@shared/icons';
defineOptions({
  name: 'TimePicker',
});
dayjs.extend(isSameOrBefore);
const props = withDefaults(defineProps<TimePickerProps>(), {
  type: 'time-range',
  size: undefined,
  format: 'HH:mm:ss',
  defaultPopupVisible: false,
  popupVisible: undefined,
  position: 'tl',
  unmountOnClose: false,
  modelValue: undefined,
  defaultValue: '',
  disableConfirm: false,
  disabledHours: () => [],
  disabledMinutes: () => [],
  disabledSeconds: () => [],
  disabled: false,
  error: false,
  allowClear: true,
  readonly: false,
});
const emit = defineEmits<TimePickerEmits>();
const { defaultValue, modelValue, popupVisible, defaultPopupVisible } =
  toRefs(props);
// 获取全局配置
const { size, exchangeTime } = getGlobalConfig(props);
const activeIndex = ref(0);
const inputRefs = useTemplateRefsList<HTMLDivElement>();
const scrollRefs = ref(new Map());
const itemRefMap = ref(new Map());
const cValue = useControlValue(modelValue, defaultValue.value, (val) => {
  emit('update:modelValue', val);
  emit('change', val);
});
const cVisible = useControlValue(
  popupVisible,
  defaultPopupVisible.value,
  (val) => {
    emit('update:popupVisible', val);
    emit('popup-visible-change', val);
    if (!val) {
      isEditing.value = false;
    }
  }
);
const computedPlaceHolder = computed(() => {
  if (isUndefined(props.placeholder))
    return props.type === 'time' ? ['请选择时间'] : ['开始时间', '结束时间'];
  if (isString(props.placeholder)) {
    return [props.placeholder, props.placeholder];
  }
  return props.placeholder;
});

const timeOptions = computed(() => {
  return Object.entries(
    generateTimeOptions({
      format: props.format,
      disabledHours: props.disabledHours,
      disabledMinutes: props.disabledMinutes,
      disabledSeconds: props.disabledSeconds,
      hideDisabledOptions: props.hideDisabledOptions,
      step: props.step,
      selectedHour: inputValue.value[activeIndex.value]?.hours,
      selectedMinute: inputValue.value[activeIndex.value]?.minutes,
    })
  )
    .map(([k, v]) => {
      return {
        key: k,
        options: v,
      };
    })
    .filter((i) => i.options.length);
});
const inputValue = ref<Record<string, string | undefined>[]>([{}, {}]);
const isEditing = ref(false);
const showValue = computed(() => {
  if (isEditing.value)
    return inputValue.value.map((item) => timeObjToStr(item, props.format));
  if (isArray(cValue.value)) return cValue.value;
  return [cValue.value, cValue.value];
});
const hanClickBox = () => {
  if (cVisible.value) return;
  // cVisible.value = true;
  inputRefs.value[activeIndex.value]?.focus?.();
  if (!cValue.value) return;
  if (props.type === 'time') {
    inputValue.value = [parseTimeStrByFormat(cValue.value, props.format)];
  } else {
    inputValue.value = [
      parseTimeStrByFormat(cValue.value[0], props.format),
      parseTimeStrByFormat(cValue.value[1], props.format),
    ];
  }
};
const config = computed(() => {
  const res = {
    hasHours: true,
    hasSeconds: true,
    hasMinutes: true,
    hasMeridiems: false,
  };
  if (!isString(props.format)) return res;
  return {
    hasHours: props.format.includes('H') || props.format.includes('h'),
    hasMinutes: props.format.includes('m'),
    hasSeconds: props.format.includes('s'),
    hasMeridiems: props.format.includes('h'),
  };
});
const hanSelectItem = (key: string, val: string) => {
  if (props.readonly) return;
  const res = inputValue.value[activeIndex.value];
  const isVaild = timeObjToStr(res, props.format) !== '';
  if (!isVaild) {
    config.value.hasHours &&
      (res['hours'] = config.value.hasMeridiems ? '12' : '00');
    config.value.hasMinutes && (res['minutes'] = '00');
    config.value.hasSeconds && (res['seconds'] = '00');
    config.value.hasMeridiems &&
      (res['meridiems'] = props.format.includes('A') ? 'AM' : 'am');
  }
  res[key] = val;
  handleSelect(res);
  //自动确认
  // if (props.disableConfirm) confirm();
};
const handleSelect = (time: Record<string, string | undefined>) => {
  if (props.readonly) return;
  inputValue.value[activeIndex.value] = time;
  emit(
    'select',
    inputValue.value.map((item) => timeObjToStr(item, props.format))
  );
  isEditing.value = true;
};
const setNow = () => {
  const now = new Date();
  const res: Record<string, string> = {};
  config.value.hasHours &&
    (res['hours'] = String(now.getHours()).padStart(2, '0'));
  config.value.hasMinutes &&
    (res['minutes'] = String(now.getMinutes()).padStart(2, '0'));
  config.value.hasSeconds &&
    (res['seconds'] = String(now.getSeconds()).padStart(2, '0'));

  if (config.value.hasMeridiems) {
    const hours = now.getHours();
    res['meridiems'] = hours >= 12 ? 'PM' : 'AM';
    res['hours'] = String(hours % 12 || 12).padStart(2, '0'); // Convert to 12-hour format
  }
  handleSelect(res);
};
const confirm = () => {
  cValue.value =
    props.type === 'time'
      ? showValue.value[0]
      : [...showValue.value].sort((a, b) => {
          const dateA = dayjs(a, props.format);
          const dateB = dayjs(b, props.format);
          return dateA.isSameOrBefore(dateB) ? -1 : 1;
        });
  console.log(showValue.value);
  cVisible.value = false;
  isEditing.value = false;
};
const setItemRef = (key: string, val: string, el: any) => {
  const str = `${key}_${val}`;
  itemRefMap.value.set(str, el);
};
const setScrollRef = (key: string, el: any) => {
  scrollRefs.value.set(key, el?.getScrollRef?.());
};
const hanInput = (e: any) => {
  const res = parseTimeStrByFormat(e.target.value, props.format);
  const isVaild =
    Object.values(res).findIndex((i) => i === 'Invalid Date') === -1;
  if (!isVaild) return;
  handleSelect(res);
};
const hanClear = () => {
  if (props.readonly) return;
  const v = undefined;
  cValue.value = props.type === 'time' ? v : ([v, v] as any);
  inputValue.value = [{}, {}];
  emit('clear');
  // isEditing.value = false;
};
watch(
  [() => activeIndex.value, () => inputValue.value, () => cVisible.value],
  async () => {
    if (!cVisible.value) return;
    await nextTick();
    Object.entries(inputValue.value[activeIndex.value]).forEach(([k, v]) => {
      const dom = itemRefMap.value.get(`${k}_${v}`);
      if (!dom) return;
      console.log(k, v);
      if (!scrollRefs.value.get(k)) return;
      new BTween({
        from: { scroll: scrollRefs.value.get(k).scrollTop || 0 },
        to: { scroll: dom.offsetTop || 0 },
        duration: 200,
        easing: 'quadOut',
        onUpdate: (current: any) => {
          scrollRefs.value.get(k)!.scrollTo?.({
            top: current.scroll || 0,
          });
        },
      }).start();
    });
  },
  {
    deep: true,
  }
);
const disabledConfirm = computed(() => {
  return !showValue.value[activeIndex.value]?.length;
});
</script>
<style scoped lang="less">
@import './style/time-picker.less';
</style>
