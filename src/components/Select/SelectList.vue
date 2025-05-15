<template>
  <yc-scrollbar
    :scrollbar-type="scrollbar ? 'virtual' : 'real'"
    class="yc-select-dropdown-list-wrapper"
    @scroll="emits('dropdownScroll')"
    @reach-bottom="emits('dropdownReachBottom')"
  >
    <div class="yc-select-dropdown-list">
      <slot />
      <!-- option -->
      <template v-for="option in renderOptions" :key="option.id">
        <template v-if="option.isGroup">
          <yc-optgroup :label="option.label">
            <yc-option
              v-for="v in option.options"
              :key="v[fieldKey.value]"
              :value="v[fieldKey.value]"
              :disabled="v[fieldKey.disabled]"
              :tag-props="v[fieldKey.tagProps]"
            >
              <component :is="renderLabel(v)" />
            </yc-option>
          </yc-optgroup>
        </template>
        <template v-else>
          <yc-option
            :value="option[fieldKey.value]"
            :disabled="option[fieldKey.disabled]"
            :tag-props="option[fieldKey.tagProps]"
          >
            <component :is="renderLabel(option)" />
          </yc-option>
        </template>
      </template>
      <!-- 空插槽 -->
      <compt-empty v-if="isEmpty" name="Select" />
    </div>
  </yc-scrollbar>
</template>

<script lang="ts" setup>
import { ObjectData } from '@shared/type';
import { getSlotFunction } from '@shared/utils';
import useProvide from './hooks/useProvide';
import { ComptEmpty } from '@shared/components';
import YcOption from './Option.vue';
import YcOptgroup from './Optgroup.vue';
import YcScrollbar from '@/components/Scrollbar';
defineProps<{
  scrollbar: boolean;
}>();
// 接收注入
const { inject } = useProvide();
const { fieldKey, isEmpty, renderOptions, slots, emits } = inject();
// 渲染label
const renderLabel = (option: ObjectData) => {
  if (slots.option) {
    return () =>
      slots.option?.({
        data: option,
      }) || [];
  }
  const { render, label } = fieldKey.value;
  return option[render]
    ? getSlotFunction(option[render])
    : getSlotFunction(option[label]);
};
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
