<!-- 时间选择器 -->
<template>
  <yc-trigger
    v-bind="triggerProps"
    :position="position"
    trigger="focus"
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
      }"
      :style="{
        height: SIZE_MAP[size] + 'px',
      }"
      @click="hanClickBox"
    >
      <div class="yc-input-box" @click="activeIndex = 0">
        <input
          :ref="inputRefs.set"
          class="yc-picker-input"
          :placeholder="computedPlaceHolder[0]"
          :value="showValue[0]"
        />
      </div>
      <span v-if="type === 'time-range'" class="yc-picker-separator">-</span>
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
                    active: inputValue[activeIndex][item.key] === t,
                  }"
                  v-for="t in item.options"
                  :key="t"
                  :ref="(el) => setItemRef(item.key, t, el)"
                  @click="hanSelectItem(item.key, t)"
                >
                  {{ t }}
                </div>
              </div>
            </YcScrollbar>
          </div>
        </div>
        <div class="yc-picker-footer">
          <YcButton size="mini" @click="setNow"> 此刻 </YcButton>
          <YcButton
            :disabled="disabledConfirm"
            type="primary"
            size="mini"
            @click="confirm"
          >
            确定
          </YcButton>
        </div>
      </div>
    </template>
  </yc-trigger>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, watch, VNodeRef } from 'vue';
import { TimePickerProps, TimeType } from './type';
import YcTrigger from '../Trigger/index.vue';
import { SIZE_MAP } from '@shared/constants';
import { isArray, isString, isUndefined } from '@shared/utils/is';
import YcButton from '@/components/Button/Button.vue';
import {
  generateTimeOptions,
  parseTimeStrByFormat,
  timeObjToStr,
} from '@shared/utils/time';
import YcScrollbar from '@/components/Scrollbar/Scrollbar.vue';
import { useTemplateRefsList } from '@vueuse/core';
import useControlValue from '@shared/hooks/useControlValue';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore);
const props = withDefaults(defineProps<TimePickerProps>(), {
  type: 'time-range',
  size: 'medium',
  format: 'HH:mm:ss',
  defaultPopupVisible: false,
  popupVisible: undefined,
  position: 'tl',
  unmountOnClose: false,
  modelValue: undefined,
  defaultValue: undefined,
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: TimePickerProps['modelValue']): void;
  (e: 'change', value: TimePickerProps['modelValue']): void;
  (e: 'clear'): void;
  (e: 'popup-visible-change', visible: boolean): void;
  (e: 'update:popupVisible', visible: boolean): void;
  (e: 'select', value: TimePickerProps['modelValue']): void;
}>();
const { defaultValue, modelValue, popupVisible, defaultPopupVisible } =
  toRefs(props);
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
  return Object.entries(generateTimeOptions(props.format))
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
  cVisible.value = true;
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
    hasHours: props.format.includes('H'),
    hasMinutes: props.format.includes('m'),
    hasSeconds: props.format.includes('s'),
    hasMeridiems: props.format.includes('h'),
  };
});
const hanSelectItem = (key: string, val: string) => {
  const res = inputValue.value[activeIndex.value];
  if (Object.keys(res).length === 0) {
    config.value.hasHours && (res['hours'] = '00');
    config.value.hasMinutes && (res['minutes'] = '00');
    config.value.hasSeconds && (res['seconds'] = '00');
    config.value.hasMeridiems &&
      (res['meridiems'] = props.format.includes('A') ? 'AM' : 'am');
  }
  console.log(res, key, val);
  res[key] = val;
  handleSelect(res);
};
const handleSelect = (time: Record<string, string | undefined>) => {
  inputValue.value[activeIndex.value] = time;
  // emit('select', time);
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
  handleSelect(res);
};
const confirm = () => {
  cValue.value = props.type === 'time' ? showValue.value[0] : [...showValue.value].sort((a, b) => {
      const dateA = dayjs(a, props.format);
      const dateB = dayjs(b, props.format);
      return dateA.isSameOrBefore(dateB) ? -1 : 1;
    });
    console.log(showValue.value)
  cVisible.value = false;
  isEditing.value = false;
};
const setItemRef = (key: string, val: string, el: any) => {
  const str = `${key}_${val}`;
  itemRefMap.value.set(str, el);
};
const setScrollRef = (key: string, el: any) => {
  scrollRefs.value.set(key, el);
};
watch(
  [() => activeIndex.value, () => inputValue.value,()=>cVisible.value],
  () => {
    // if(!cVisible.value)return
    Object.entries(inputValue.value[activeIndex.value]).forEach(
      ([k, v], index) => {
        const dom = itemRefMap.value.get(`${k}_${v}`);
        if (!dom) return;
        scrollRefs.value.get(k)?.scrollTo?.({
          top: dom.offsetTop || 0,
          behavior: cVisible.value ? 'smooth' : 'auto',
        });
      }
    );
  },
  {
    deep: true,
  }
);
const disabledConfirm = computed(() => {
  return !showValue.value[activeIndex.value].length
});
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
