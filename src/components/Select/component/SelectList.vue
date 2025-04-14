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
              :label="v[fieldKey.label]"
              :disabled="v[fieldKey.disabled]"
            />
          </yc-optgroup>
        </template>
        <template v-else>
          <yc-option
            :value="option[fieldKey.value]"
            :label="option[fieldKey.label]"
            :disabled="option[fieldKey.disabled]"
          >
            <slot name="option" :data="option">
              <component
                v-if="option[fieldKey.label].render"
                :is="option[fieldKey.label].render"
              />
              <template v-else>
                {{ option[fieldKey.label].label }}
              </template>
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
import { ObjectData } from '@shared/type';
import YcEmpty from '@/components/Empty';
import YcOption from '../Option.vue';
import YcOptgroup from '../Optgroup.vue';
defineProps<{
  renderOptions: ObjectData[];
  fieldKey: Record<string, string>;
  scrollbar: boolean;
  isEmpty: boolean;
}>();
const emits = defineEmits<{
  (e: 'dropdownScroll'): void;
  (e: 'dropdownReachBottom'): void;
}>();
</script>

<style lang="less" scoped>
@import '../style/select.less';
</style>
