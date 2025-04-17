<template>
  <yc-prevent-focus
    :class="[
      'yc-input-tag',
      !computedValue.length ? 'yc-input-tag-no-value' : '',
      disabled ? 'yc-input-tag-disabled' : '',
      error ? 'yc-input-tag-error' : '',
      $slots.suffix || showClearBtn ? 'yc-input-tag-has-suffix' : '',
      INPUT_TAG_SIZE_CLASS[size],
    ]"
    @click="inputRef?.focus()"
  >
    <!-- prefix-icon -->
    <yc-prevent-focus v-if="$slots.prefix" class="yc-input-tag-prefix">
      <slot name="prefix" />
    </yc-prevent-focus>
    <!-- mirror -->
    <div class="yc-input-tag-mirror" ref="mirrorRef">
      {{ computedInputValue || (computedValue.length ? '' : placeholder) }}
    </div>
    <!-- tag-list -->
    <tag-overflow-list
      :computed-value="computedValue"
      :max-tag-count="maxTagCount"
      :field-key="fieldKey"
      :size="size"
      :tagNowrap="tagNowrap"
      :format-tag="formatTag"
      class="yc-input-tag-inner"
      @close="(ev, id) => handleEvent('close', ev, id)"
    >
      <template #extra>
        <input
          v-model="computedInputValue"
          key="yc-input-tag-input"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="computedValue.length ? '' : placeholder"
          :style="{
            width: `${width}px`,
          }"
          class="yc-input-tag-input"
          ref="inputRef"
          @input="handleEvent('input', $event)"
          @change="handleEvent('inputValueChange', $event)"
          @focus="handleEvent('focus', $event)"
          @blur="handleEvent('blur', $event)"
          @keydown.enter="handleEvent('pressEnter', $event)"
          @keydown.delete="handleEvent('remove', $event)"
        />
      </template>
    </tag-overflow-list>
    <!-- suffix-icon -->
    <yc-prevent-focus
      v-if="$slots.suffix || showClearBtn"
      class="yc-input-tag-suffix"
    >
      <!-- clear-btn -->
      <yc-icon-button
        v-if="showClearBtn"
        class="yc-input-tag-clear-button"
        @click="handleEvent('clear', $event)"
      />
      <slot name="suffix" />
    </yc-prevent-focus>
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { INPUT_TAG_SIZE_CLASS } from '@shared/constants';
import {
  InputTagProps,
  InputTagValue,
  TagData,
  InputRetainValue,
  InputTagEvent,
  InputTagEventType,
} from './type';
import { ObjectData } from '@shared/type';
import { isBoolean, isObject } from '@shared/utils';
import { nanoid } from 'nanoid';
import { useElementSize } from '@vueuse/core';
import { useControlValue, useConfigProvder } from '@shared/hooks';
import TagOverflowList from './component/TagOverflowList.vue';
import { YcPreventFocus, YcIconButton } from '@shared/components';
defineOptions({
  name: 'InputTag',
});
const props = withDefaults(defineProps<InputTagProps>(), {
  modelValue: undefined,
  defaultValue: () => [],
  inputValue: undefined,
  defaultInputValue: '',
  placeholder: '',
  disabled: false,
  error: false,
  readonly: false,
  allowClear: false,
  size: undefined,
  maxTagCount: 5,
  retainInputValue: false,
  formatLabel: undefined,
  uniqueValue: false,
  tagNowrap: false,
  fieldNames: () => {
    return {
      id: 'id',
      label: 'label',
      value: 'value',
      closeable: 'closeable',
      tagProps: 'tagProps',
    };
  },
  allowCreate: true,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: InputTagValue): void;
  (e: 'update:inputValue', value: string): void;
  (e: 'input', value: string): void;
  (e: 'inputValueChange', value: string, ev: Event): void;
  (e: 'remove', ev: MouseEvent | KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'pressEnter', ev: KeyboardEvent): void;
}>();
const {
  modelValue,
  defaultValue,
  inputValue,
  defaultInputValue,
  allowClear,
  disabled,
  readonly,
  uniqueValue,
  retainInputValue,
  allowCreate,
  maxTagCount,
  fieldNames,
  tagNowrap,
} = toRefs(props);
// 获取全局配置
const { size } = useConfigProvder(props);
// 输入实例
const inputRef = ref<HTMLInputElement>();
// div的ref
const mirrorRef = ref<HTMLDivElement>();
// 是否聚焦
const isFocus = ref<boolean>(false);
// fieldKey
const fieldKey = computed(() => {
  return {
    id: fieldNames.value['id'] ?? 'id',
    label: fieldNames.value['label'] ?? 'label',
    value: fieldNames.value['value'] ?? 'value',
    closeable: fieldNames.value['closeable'] ?? 'closeable',
    tagProps: fieldNames.value['tagProps'] ?? 'tagProps',
  };
});
// 获取miorr的宽度用于模拟
const { width } = useElementSize(mirrorRef, undefined, {
  box: 'border-box',
});
// 受控值
const computedValue = useControlValue<InputTagValue>(
  modelValue,
  defaultValue.value,
  (val) => emits('update:modelValue', val),
  (val: InputTagValue) => {
    if (isObject(val[0]) && val[0]?.id) return val;
    const { id, label, value } = fieldKey.value;
    return val.map((v) => {
      const tagData: ObjectData = {};
      tagData[id] = nanoid();
      tagData[label] = v;
      tagData[value] = v;
      return tagData;
    });
  }
);
// 输入值
const computedInputValue = useControlValue<string>(
  inputValue,
  defaultInputValue.value,
  (val) => emits('update:inputValue', val)
);
// 是否展示清除按钮
const showClearBtn = computed(
  () =>
    allowClear.value &&
    !disabled.value &&
    !readonly.value &&
    computedValue.value.length
);
// 清除输入值
const clearInputValue = () => {
  // 是否保留值
  if (
    (isBoolean(retainInputValue.value) && retainInputValue.value) ||
    (retainInputValue.value as InputRetainValue)?.create
  ) {
    return;
  }
  computedInputValue.value = '';
};
// 处理inputTag的事件
const handleEvent = (
  type: InputTagEventType,
  e: InputTagEvent,
  id?: string
) => {
  const inputVal = computedInputValue.value?.trim();
  // blur
  if (['input', 'inputValueChange'].includes(type)) {
    const { value } = e.target as HTMLInputElement;
    emits(type as any, value, e as Event);
  }
  // focus
  else if (['blur', 'focus'].includes(type)) {
    isFocus.value = type == 'focus';
    emits(type as any, e as FocusEvent);
    if (!isFocus.value) {
      clearInputValue();
    }
  }
  // enter
  else if (type == 'pressEnter') {
    const { label, value, id } = fieldKey.value;
    const isUnique =
      !uniqueValue.value ||
      (uniqueValue.value &&
        !computedValue.value.find(
          (item: ObjectData) => (item?.[value] ?? item) == inputVal
        ));

    if (!inputVal || !allowCreate.value || !isUnique) {
      return;
    }
    const tagData: ObjectData = {};
    tagData[id] = nanoid();
    tagData[label] = computedInputValue.value;
    tagData[value] = computedInputValue.value;
    computedValue.value = [...computedValue.value, tagData];
    emits('pressEnter', e as KeyboardEvent);
    clearInputValue();
  }
  // close
  else if (type == 'close') {
    computedValue.value = (computedValue.value as TagData[]).filter(
      (_, index) => computedValue.value[index].id != id
    );
    emits('remove', e as MouseEvent);
  }
  // del
  else if (type == 'remove') {
    if (inputVal || !computedValue.value?.length) return;
    computedValue.value = computedValue.value.slice(
      0,
      computedValue.value.length - 1
    );
    emits('remove', e as MouseEvent);
  }
  // clear
  else if (type == 'clear') {
    computedValue.value = [];
    emits('clear', e as MouseEvent);
  }
};
// 暴露方法
defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
  getValue() {
    return computedValue.value;
  },
});
</script>

<style lang="less" scoped>
@import './style/input-tag.less';
</style>
