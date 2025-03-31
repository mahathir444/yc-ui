<template>
  <!-- input模式 -->
  <yc-auto-complete
    v-if="type == 'input'"
    v-model="computedValue"
    :popupVisible="popupVisible"
    :data="data"
    :disabled="disabled"
    :allow-clear="allowClear"
    :is-select-set-value="false"
    :is-search="false"
    class="yc-mention"
    ref="inputRef"
    v-bind="$attrs"
    @input="(v, ev) => handleEvent('input', ev, v)"
    @select="(v) => handleEvent('blur', null, v)"
    @focus="(ev) => handleEvent('focus', ev)"
    @blur="(ev) => handleEvent('blur', ev)"
  >
  </yc-auto-complete>
  <!-- textarea模式 -->
  <yc-select
    v-else
    :popup-visible="popupVisible"
    :options="data"
    :trigger-props="{
      autoFitPopupWidth: false,
      autoFitPopupMinWidth: false,
      autoSetPosition: true,
    }"
    hotkeys
    @select="(v) => handleEvent('select', null, v as string)"
    ref="selectRef"
  >
    <template #trigger>
      <slot name="trigger">
        <yc-textarea
          v-model="computedValue"
          :disabled="disabled"
          :allow-clear="allowClear"
          enter-prevent
          show-mirror
          class="yc-mention"
          ref="textareaRef"
          v-bind="$attrs"
          @input="(v, ev) => handleEvent('input', ev, v)"
          @focus="(ev) => handleEvent('focus', ev)"
          @blur="(ev) => handleEvent('blur', ev)"
        >
        </yc-textarea>
      </slot>
    </template>
  </yc-select>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, computed } from 'vue';
import { MentionProps } from './type';
import { ObjectData } from '@shared/type';
import { isNull, isArray } from '@shared/utils/is';
import useControlValue from '@shared/hooks/useControlValue';
import useCursor from '@shared/hooks/useCursor';
import { default as YcSelect, SelectInstance } from '@/components/Select';
import YcAutoComplete, {
  AutoCompleteInstance,
} from '@/components/AutoComplete';
import { default as YcTextarea, TextareaInstance } from '@/components/Textarea';
defineOptions({
  name: 'Mention',
});
const props = withDefaults(defineProps<MentionProps>(), {
  modelValue: undefined,
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
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
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
// inputRef
const inputRef = ref<AutoCompleteInstance>();
// textRef
const textareaRef = ref<TextareaInstance>();
// 选择ref
const selectRef = ref<SelectInstance>();
// dom
const inputDom = ref<HTMLInputElement | HTMLTextAreaElement>();
// prefix+选择的匹配
const prefixTexts = computed(() => {
  return isArray(prefix.value)
    ? prefix.value
        .map((ch) => data.value.map((op) => ch + (op as ObjectData).value))
        .flat(1)
    : data.value.map((op) => prefix.value + (op as ObjectData).value);
});
// 记录光标位置
const { recordCursor, getCursor } = useCursor(inputDom);
// 是否匹配前缀
const isMatchPrefix = (ch: string) => {
  return isArray(prefix.value) ? prefix.value.includes(ch) : prefix.value == ch;
};
// 获取光标位置
const getCursorPostion = (cursor: number) => {
  const el = textareaRef.value!.getMirrorRef();
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
  type: 'input' | 'select' | 'clear' | 'focus' | 'blur',
  ev: Event | FocusEvent | MouseEvent | null,
  value: string = ''
) => {
  // 输入
  if (type == 'input') {
    emits('input', value, ev as Event);
    const { selectionStart } = inputDom.value!;
    recordCursor();
    const cursor = getCursor() ?? selectionStart;
    if (isNull(cursor)) return;
    popupVisible.value = isMatchPrefix(value[cursor - 1]);
    if (!popupVisible.value || mentionType.value != 'textarea') return;
    const { x, y } = getCursorPostion(cursor);
    const { bottom } = inputDom.value!.getBoundingClientRect();
    selectRef.value?.getPopupRef()?.updatePosition(x, y > bottom ? bottom : y);
  }
  // 选中
  else if (type == 'select') {
    popupVisible.value = false;
    if (!split.value) {
      computedValue.value += value as string;
      return;
    }
    const needSplit = prefixTexts.value.some((prefixText) =>
      computedValue.value.includes(prefixText)
    );
    // 当前的分隔符
    const curSplit = needSplit ? split.value : '';
    // 之前的值
    const preValue = computedValue.value.slice(
      0,
      computedValue.value.length - 1
    );
    // 现在的值
    const curValue =
      computedValue.value.slice(computedValue.value.length - 1) + value;
    computedValue.value = preValue + curSplit + curValue;
  }
  // 聚焦
  else if (type == 'focus') {
    popupVisible.value = isMatchPrefix(
      computedValue.value[computedValue.value.length - 1]
    );
    emits('focus', ev as FocusEvent);
  }
  // 失焦
  else if (type == 'blur') {
    popupVisible.value = false;
    emits('blur', ev as FocusEvent);
  }
};
onMounted(() => {
  inputDom.value =
    mentionType.value == 'input'
      ? inputRef.value!.getInputRef()
      : textareaRef.value?.getInputRef();
});

defineExpose({
  focus() {
    inputDom.value?.focus();
  },
  blur() {
    inputDom.value?.blur();
  },
});
</script>
