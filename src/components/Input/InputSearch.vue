<template>
  <yc-input
    v-bind="$attrs"
    :class="[
      'yc-input-search',
      searchButton ? 'yc-input-search-append' : '',
      $attrs.class,
    ]"
    ref="inputBaseRef"
    @update:model-value="(v) => $emit('update:modelValue', v)"
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
          <icon-search />
        </template>
      </yc-button>
      <slot v-else name="append" />
    </template>
    <!-- extra -->
    <template v-if="!searchButton" #extra>
      <yc-icon-button
        font-size="14px"
        @click="emits('search', inputBaseRef?.getValue() || '')"
      >
        <template #icon>
          <icon-search />
        </template>
      </yc-icon-button>
    </template>
  </yc-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InputSearchProps } from './type';
import YcInput from './Input.vue';
import YcButton from '@/components/Button';
import { IconSearch } from '@shared/icons';

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
  (e: 'search', value: string): void;
}>();
// 组件实例
const inputBaseRef = ref<InstanceType<typeof YcInput>>();
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
@import './style/input-search.less';
</style>
