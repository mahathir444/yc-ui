<template>
  <yc-scrollbar
    :scrollbar-type="scrollbar ? 'virtual' : 'real'"
    class="yc-select-dropdown-list-wrapper"
    @scroll="emits('dropdownScroll')"
    @reach-bottom="emits('dropdownReachBottom')"
  >
    <div class="yc-select-dropdown-list">
      <slot />
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
              <slot name="option" :data="v">
                <component :is="getRender(v)" />
              </slot>
            </yc-option>
          </yc-optgroup>
        </template>
        <template v-else>
          <yc-option
            :value="option[fieldKey.value]"
            :disabled="option[fieldKey.disabled]"
            :tag-props="option[fieldKey.tagProps]"
          >
            <slot name="option" :data="option">
              <component :is="getRender(option)" />
            </slot>
          </yc-option>
        </template>
      </template>
      <slot v-if="isEmpty" name="empty">
        <yc-empty description="暂无数据" />
      </slot>
    </div>
  </yc-scrollbar>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { ObjectData } from '@shared/type';
import { getSlotFunction } from '@shared/utils';
import YcEmpty from '@/components/Empty';
import YcOption from './Option.vue';
import YcOptgroup from './Optgroup.vue';
const props = defineProps<{
  renderOptions: ObjectData[];
  fieldKey: Record<string, string>;
  scrollbar: boolean;
  isEmpty: boolean;
}>();
const emits = defineEmits<{
  (e: 'dropdownScroll'): void;
  (e: 'dropdownReachBottom'): void;
}>();
const { fieldKey } = toRefs(props);
// 渲染
const getRender = (option: ObjectData) => {
  const { render, label } = fieldKey.value;
  return option[render] ?? getSlotFunction(option[label]);
};
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
