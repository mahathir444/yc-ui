<template>
  <!-- suffix-icon -->
  <yc-prevent-focus class="yc-input-suffix" ref="suffixRef">
    <!-- clear-btn -->
    <yc-icon-button
      v-if="showClearBtn"
      class="yc-input-clear-button"
      @click="$emit('clear', $event)"
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
      v-if="isPassword && invisibleButton"
      :size="14"
      @click="$emit('visibilityChange', !computedVisibility)"
    >
      <icon-eye-open v-if="!computedVisibility" />
      <icon-eye-close v-else />
    </yc-icon-button>
    <!-- search -->
    <yc-icon-button
      v-if="isSearch && !searchButton"
      :size="14"
      @click="$emit('search')"
    >
      <icon-search />
    </yc-icon-button>
    <!-- suffix -->
    <slot name="suffix" />
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { IconSearch, IconEyeOpen, IconEyeClose } from '@shared/icons';
import { YcPreventFocus, YcIconButton } from '@shared/components';
defineProps<{
  curLength: number;
  maxLength?: number;
  showClearBtn: boolean;
  showWordLimit: boolean;
  computedValue: string;
  computedVisibility: boolean;
  isSearch: boolean;
  searchButton: boolean;
  isPassword: boolean;
  invisibleButton: boolean;
}>();
defineEmits<{
  (e: 'search'): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'visibilityChange', value: boolean): void;
}>();
</script>

<style lang="less" scoped>
@import './style/input.less';
</style>
