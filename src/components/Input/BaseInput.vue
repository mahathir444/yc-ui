<template>
  <div
    :class="[
      'yc-input-wrapper',
      disabled ? 'yc-input-disabled' : '',
      error ? 'yc-input-error' : '',
      SIZE_CLASS[size],
    ]"
  >
    <!-- prefix-icon -->
    <yc-prevent-focus v-if="$slots.prefix" class="yc-input-prefix">
      <slot name="prefix" />
    </yc-prevent-focus>
    <!-- input -->
    <input
      v-show="!$slots.label || ($slots.label && showInput)"
      v-model="computedValue"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      v-bind="inputAttrs"
      class="yc-input"
      ref="inputRef"
      @input="handleEvent('input', $event)"
      @change="handleEvent('change', $event)"
      @focus="handleEvent('focus', $event)"
      @blur="handleEvent('blur', $event)"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @keydown.enter="handleEvent('keydown', $event)"
    />
    <!-- select模式下的label -->
    <yc-prevent-focus
      v-if="$slots.label"
      v-show="!showInput"
      class="yc-input text-ellipsis"
    >
      <slot name="label" />
    </yc-prevent-focus>
    <!-- suffix-icon -->
    <yc-prevent-focus
      v-if="$slots.suffix || $slots.extra || showWordLimit || showClearBtn"
      class="yc-input-suffix"
    >
      <!-- clear-btn -->
      <yc-icon-button
        v-if="showClearBtn"
        class="yc-input-clear-button"
        @click="handleEvent('clear', $event)"
      />
      <!-- word-limit -->
      <yc-prevent-focus
        v-if="showWordLimit"
        tag="span"
        class="yc-input-word-limit"
      >
        {{ curLength }}
        /
        {{ maxLength }}
      </yc-prevent-focus>
      <!-- password -->
      <yc-icon-button
        v-if="type == 'password' && invisibleButton"
        size="14px"
        @click="computedVisibility = !computedVisibility"
      >
        <template #icon>
          <icon-eye-open v-if="computedVisibility" />
          <icon-eye-close v-else />
        </template>
      </yc-icon-button>
      <!-- search -->
      <yc-icon-button
        v-if="type == 'search' && !searchButton"
        font-size="14px"
        @click="emits('search', computedValue)"
      >
        <template #icon>
          <icon-search />
        </template>
      </yc-icon-button>
      <!-- suffix -->
      <slot name="suffix" />
    </yc-prevent-focus>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, Ref, WritableComputedRef } from 'vue';
import { InputEvent, InputEventType } from './type';
import { Fn } from '@shared/type';
defineProps<{
  invisibleButton: boolean;
  searchButton: boolean;
}>();
const { computedValue, computedVisibility, emits } = inject<{
  computedValue: Ref<string> | WritableComputedRef<string>;
  computedVisibility: Ref<boolean> | WritableComputedRef<boolean>;
  invisibleButton: Ref<boolean>;
  searchButton: Ref<boolean>;
  emits: Fn;
}>('input-props', {
  computedValue: ref(''),
  computedVisibility: ref(false),
  invisibleButton: ref(true),
  searchButton: ref<true>,
  emits: () => {},
});
// 输入实例
const inputRef = ref<HTMLInputElement>();

// 处理输入，改变和清除
const handleEvent = async (type: InputEventType, e: InputEvent) => {
  // focus,blur,change
  if (['focus', 'blur', 'change'].includes(type)) {
    emits(type as any, e as FocusEvent);
  }
  // input
  else if (type == 'input') {
    handleLimitedInput(e);
  }
  // clear
  else if (type == 'clear') {
    computedValue.value = '';
    emits('clear', e as MouseEvent);
  }
  //enter
  else if (type == 'keydown') {
    const ev = e as KeyboardEvent;
    ev.keyCode == 13 && emits('pressEnter', ev);
    emits('keydown', ev);
  }
};
</script>

<style lang="less" scoped></style>
