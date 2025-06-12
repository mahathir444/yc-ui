<template>
  <!-- input模式 -->
  <yc-auto-complete
    :model-value="modelValue"
    :default-value="defaultValue"
    :popupVisible="popupVisible"
    :data="data"
    :disabled="disabled"
    :allow-clear="allowClear"
    :is-select-set-value="false"
    :is-search="false"
    :type="type"
    :trigger-props="{
      autoFitPopupWidth: type == 'input',
      autoSetPosition: type == 'textarea',
    }"
    class="yc-mention"
    ref="autoCompleteRef"
    v-bind="$attrs"
    @update:model-value="(v) => (computedValue = v)"
    @input="(v, ev) => handleEvent('input', ev, v)"
    @change="(v) => $emit('change', v as string)"
    @search="(v) => $emit('search', v)"
    @clear="(ev) => $emit('clear', ev as MouseEvent)"
    @select="(v) => handleEvent('select', null, v)"
    @focus="(ev) => handleEvent('focus', ev)"
    @blur="(ev) => handleEvent('blur', ev)"
    @keydown="(ev) => handleEvent('keydown', ev)"
  >
    <template v-if="$slots.option" #option="{ data }">
      <slot name="option" :data="data" />
    </template>
  </yc-auto-complete>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, computed, nextTick } from 'vue';
import {
  MentionProps,
  MentionEmits,
  MentionSlots,
  MentionExpose,
} from './type';
import { ObjectData } from '@shared/type';
import { isNull, isArray, useControlValue } from '@shared/utils';
import useCursor from '@/components/Input/hooks/useCursor';
import { SelectValue } from '@/components/Select';
import {
  default as YcAutoComplete,
  AutoCompleteInstance,
} from '@/components/AutoComplete';
defineOptions({
  name: 'Mention',
});
defineSlots<MentionSlots>();
const props = withDefaults(defineProps<MentionProps>(), {
  modelValue: undefined,
  defaultValue: '',
  data: () => [],
  prefix: '@',
  split: '',
  type: 'input',
  disabled: false,
  allowClear: false,
});
const emits = defineEmits<MentionEmits>();
const {
  modelValue,
  defaultValue,
  allowClear,
  disabled,
  prefix,
  split,
  data,
  type: mentionType,
} = toRefs(props);
//   控制值
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => emits('update:modelValue', val)
);
// 可见性
const popupVisible = ref<boolean>(false);
// autoCompleteRef
const autoCompleteRef = ref<AutoCompleteInstance>();
// dom
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement>();
// prefix+选择的匹配
const prefixTexts = computed(() => {
  return isArray(prefix.value)
    ? prefix.value
        .map((ch) => data.value.map((op) => ch + (op as ObjectData).value))
        .flat(1)
    : data.value.map((op) => prefix.value + (op as ObjectData).value);
});
// 记录光标位置
const { recordCursor, getCursor: _getCursor } = useCursor(inputRef);
// 是否匹配前缀
const isMatchPrefix = (ch: string) => {
  return isArray(prefix.value) ? prefix.value.includes(ch) : prefix.value == ch;
};
// 获取光标
const getCursor = () => {
  recordCursor();
  const { selectionStart } = inputRef.value!;
  const cursor = _getCursor() ?? selectionStart;
  return cursor as number;
};
// 设置pop位置
const setPopPosition = (cursor: number) => {
  const el = autoCompleteRef.value!.getMirrorRef();
  // 创建一个临时的范围对象
  const range = document.createRange();
  // 获取文本节点（纯文本div只有一个文本节点）
  const textNode = el!.childNodes[0];
  // 设置范围
  range.setStart(textNode, cursor);
  range.setEnd(textNode, cursor);
  // 获取位置信息
  const { bottom: y, left: x } = range.getBoundingClientRect();
  const { bottom } = inputRef.value!.getBoundingClientRect();
  autoCompleteRef.value?.updatePosition(x, y > bottom ? bottom : y);
};
// 处理事件
const handleEvent = async (
  type: string,
  ev: Event | null,
  value: string = ''
) => {
  switch (type) {
    case 'input':
      {
        emits('input', value, ev as Event);
        await nextTick();
        const cursor = getCursor();
        if (isNull(cursor)) return;
        popupVisible.value = isMatchPrefix(value[cursor - 1]);
        if (!popupVisible.value || mentionType.value != 'textarea') return;
        setPopPosition(cursor);
      }
      break;
    case 'select':
      {
        const { selectionStart } = inputRef.value!;
        const cursor = (getCursor() ?? selectionStart) as number;
        emits('select', value as SelectValue);
        popupVisible.value = false;
        const needSplit = prefixTexts.value.some((prefixText) =>
          computedValue.value.includes(prefixText)
        );
        if (needSplit) {
          // 之前的值
          const preValue = computedValue.value.slice(0, cursor - 1);
          // 现在的值
          const prefixCh = computedValue.value.slice(cursor - 1, cursor);
          const curValue = computedValue.value.slice(cursor);
          computedValue.value =
            preValue + split.value + prefixCh + value + curValue;
        } else {
          computedValue.value =
            computedValue.value.slice(0, cursor) +
            value +
            computedValue.value.slice(cursor);
        }
      }
      break;
    case 'focus':
      {
        emits('focus', ev as FocusEvent);
      }
      break;
    case 'blur':
      {
        popupVisible.value = false;
        emits('blur', ev as FocusEvent);
      }
      break;
    case 'keydown': {
      const e = ev as KeyboardEvent;
      if (!['Backspace'].includes(e.key)) {
        return;
      }
      const target = e.target as HTMLInputElement;
      const cursor = getCursor();
      popupVisible.value = isMatchPrefix(target.value[cursor - 1]);
      if (!popupVisible.value || mentionType.value != 'textarea') return;
      setPopPosition(cursor);
    }
  }
};
onMounted(() => {
  inputRef.value = autoCompleteRef.value?.getInputRef();
});

defineExpose<MentionExpose>({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
});
</script>
