<template>
  <yc-input
    v-bind="$attrs"
    :class="[
      'yc-input-search',
      searchButton ? 'yc-input-search-append' : '',
      $attrs.class,
    ]"
    ref="inputBaseRef"
    @input="handleInput"
    @change="handleChange"
    @clear="handleClear"
    @focus="(e) => emits('focus', e)"
    @blur="(e) => emits('blur', e)"
    @press-enter="(e) => emits('press-enter', e)"
  >
    <!-- prefix -->
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <!-- suffix -->
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
    <!-- prepend -->
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <!-- append -->
    <template v-if="searchButton || $slots.append" #append>
      <yc-button
        v-if="searchButton"
        type="primary"
        @click="emits('search', inputBaseRef?.getValue() || '')"
      >
        <template #icon>
          <svg-icon name="search" size="14" />
        </template>
      </yc-button>
      <slot v-else name="append" />
    </template>
    <!-- extra -->
    <template v-if="!searchButton" #extra>
      <yc-icon-button
        name="search"
        font-size="14px"
        @click="emits('search', inputBaseRef?.getValue() || '')"
      />
    </template>
  </yc-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InputSearchProps } from './type';
import YcInput from './Input.vue';
import YcButton from '@/packages/Button/Button.vue';
import YcIconButton from '@/packages/_components/IconButton/index.vue';
defineOptions({
  name: 'InputSearch',
});
withDefaults(defineProps<InputSearchProps>(), {
  searchButton: false,
  size: 'medium',
  disabled: false,
  loading: false,
  buttonText: '',
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'press-enter', ev: KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'search', value: string): void;
}>();
// 组件实例
const inputBaseRef = ref<InstanceType<typeof YcInput>>();
// 处理输入
const handleInput = (value: string, ev: Event) => {
  emits('input', value, ev);
  emits('update:modelValue', value);
};
// 处理改变
const handleChange = (value: string, ev: Event) => {
  emits('change', value, ev);
  emits('update:modelValue', value);
};
// 处理清除
const handleClear = (e: MouseEvent) => {
  emits('clear', e);
  emits('update:modelValue', '');
};

defineExpose({
  focus() {
    inputBaseRef.value?.focus();
  },
  blur() {
    inputBaseRef.value?.blur();
  },
});
</script>

<style lang="less" scoped>
.yc-input-search-append {
  &:deep(.yc-input-append) {
    padding: 0;
    .yc-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
