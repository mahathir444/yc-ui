<template>
  <div class="yc-dropdown-button">
    <yc-button
      :disabled="disabled"
      :type="type"
      :size="size"
      v-bind="buttonProps"
      @click="(ev) => $emit('click', ev)"
    >
      <slot />
    </yc-button>
    <yc-dropdown
      :popup-visible="popupVisible"
      :default-popup-visible="defaultPopupVisible"
      :trigger="trigger"
      :position="position"
      :popup-container="popupContainer"
      :hide-on-select="hideOnSelect"
      :disabled="disabled"
      v-bind="$attrs"
      @select="(v) => $emit('select', v)"
      @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    >
      <yc-button
        :disabled="disabled"
        :type="type"
        :size="size"
        v-bind="buttonProps"
      >
        <template #icon>
          <slot name="icon">
            <svg-icon name="more" />
          </slot>
        </template>
      </yc-button>
      <template #content>
        <slot name="content"></slot>
      </template>
    </yc-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { DropdownButtonProps, DoptionValue } from './type';
import YcButton from '@/packages/Button/Button.vue';
import YcDropdown from './Dropdown.vue';
defineOptions({
  name: 'DropdownButton',
});
withDefaults(defineProps<DropdownButtonProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'click',
  position: 'br',
  popupContainer: 'body',
  disabled: false,
  type: 'secondary',
  size: 'medium',
  buttonProps: () => {
    return {};
  },
  hideOnSelect: true,
});
defineEmits<{
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'click', ev: MouseEvent): void;
  (e: 'select', value: DoptionValue): void;
}>();
</script>

<style lang="less" scoped>
.yc-dropdown-button {
  display: flex;
  align-items: center;

  .yc-button {
    flex-shrink: 0;
    border-radius: 0;
    &:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      border-right: 1px solid rgb(229, 230, 235);
    }
    &:last-child {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
}
</style>
