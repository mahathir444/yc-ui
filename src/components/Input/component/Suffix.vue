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
      font-size="14px"
      @click="$emit('visibilityChange', !computedVisibility)"
    >
      <template #icon>
        <icon-eye-open v-if="!computedVisibility" />
        <icon-eye-close v-else />
      </template>
    </yc-icon-button>
    <!-- search -->
    <yc-icon-button
      v-if="isSearch && !searchButton"
      font-size="14px"
      @click="$emit('search')"
    >
      <template #icon>
        <icon-search />
      </template>
    </yc-icon-button>
    <!-- suffix -->
    <slot name="suffix" />
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { IconSearch, IconEyeOpen, IconEyeClose } from '@shared/icons';
import YcPreventFocus from '@shared/components/PreventFocus';
import YcIconButton from '@shared/components/IconButton';
defineProps<{
  curLength: number;
  maxLength: number;
  showClearBtn: boolean;
  showWordLimit: boolean;
  computedValue: boolean;
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
@import '../style/input.less';
</style>
