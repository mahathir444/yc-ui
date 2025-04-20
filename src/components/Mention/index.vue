<template>
  <!-- input模式 -->
  <yc-auto-complete
    v-model="computedValue"
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
    @input="(v, ev) => handleEvent('input', ev, v)"
    @change="(v) => $emit('change', v as string)"
    @search="(v) => $emit('search', v)"
    @clear="(ev) => $emit('clear', ev as MouseEvent)"
    @select="(v) => handleEvent('select', null, v)"
    @focus="(ev) => handleEvent('focus', ev)"
    @blur="(ev) => handleEvent('blur', ev)"
  >
    <template v-if="$slots.option" #option>
      <slot name="option" />
    </template>
  </yc-auto-complete>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, computed } from 'vue';
import { MentionProps } from './type';
import { ObjectData } from '@shared/type';
import { isNull, isArray } from '@shared/utils';
import { useControlValue, useCursor } from '@shared/hooks';
import YcAutoComplete, {
  AutoCompleteInstance,
} from '@/components/AutoComplete';
import { SelectValue } from '@/components/Select';
defineOptions({
  name: 'Mention',
});
const props = withDefaults(defineProps<MentionProps>(), {
  modelValue: void 0,
  defaultValue: '',
  data: () => [],
  prefix: '@',
  split: '',
  type: 'textarea',
  disabled: false,
  allowClear: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'search', value: string): void;
  (e: 'select', value: SelectValue): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'input', value: string, ev: Event): void;
}>();
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
const { recordCursor, getCursor } = useCursor(inputRef);
// 是否匹配前缀
const isMatchPrefix = (ch: string) => {
  return isArray(prefix.value) ? prefix.value.includes(ch) : prefix.value == ch;
};
// 获取光标位置
const getCursorPostion = (cursor: number) => {
  const el = autoCompleteRef.value!.getMirrorRef();
  console.log(el);
  // 创建一个临时的范围对象
  const range = document.createRange();
  // 获取文本节点（纯文本div只有一个文本节点）
  const textNode = el.childNodes[0];
  // 设置范围
  range.setStart(textNode, cursor);
  range.setEnd(textNode, cursor);
  // 获取位置信息
  const { bottom, left } = range.getBoundingClientRect();
  return {
    x: left,
    y: bottom,
  };
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
        const { selectionStart } = inputRef.value!;
        recordCursor();
        const cursor = getCursor() ?? selectionStart;
        if (isNull(cursor)) return;
        popupVisible.value = isMatchPrefix(value[cursor - 1]);
        if (!popupVisible.value || mentionType.value != 'textarea') return;
        const { x, y } = getCursorPostion(cursor);
        const { bottom } = inputRef.value!.getBoundingClientRect();
        autoCompleteRef.value?.updatePosition(x, y > bottom ? bottom : y);
      }
      break;
    case 'select':
      {
        emits('select', value as SelectValue);
        popupVisible.value = false;
        computedValue.value += value as string;
        // if (!split.value) {
        //   computedValue.value += value as string;
        //   return;
        // }
        // const needSplit = prefixTexts.value.some((prefixText) =>
        //   computedValue.value.includes(prefixText)
        // );
        // recordCursor();
        // const cursor = getCursor() ?? computedValue.value.length - 1;
        // // 当前的分隔符
        // const curSplit = needSplit ? split.value : '';
        // // 之前的值
        // const preValue = computedValue.value.slice(0, cursor);
        // // 现在的值
        // const prefixCh = computedValue.value.slice(cursor, cursor + 1);
        // const curValue = computedValue.value.slice(cursor + 1);
        // computedValue.value = preValue + curSplit + prefixCh + value + curValue;
      }
      break;
    case 'focus':
      {
        popupVisible.value = isMatchPrefix(
          computedValue.value[computedValue.value.length - 1]
        );
        emits('focus', ev as FocusEvent);
      }
      break;
    case 'blur':
      {
        popupVisible.value = false;
        emits('blur', ev as FocusEvent);
      }
      break;
  }
};
onMounted(() => {
  inputRef.value = autoCompleteRef.value?.getInputRef();
});

defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
});
</script>
