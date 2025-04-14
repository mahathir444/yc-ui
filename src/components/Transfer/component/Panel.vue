<template>
  <div class="yc-transfer-view">
    <!-- header -->
    <div class="yc-transfer-view-header">
      <span class="yc-transfer-view-header-title">
        <slot v-if="!showSelectAll || simple || oneWay" name="title">
          {{ title }}
        </slot>
        <yc-checkbox
          v-else
          v-model="selectedAll"
          :indeterminate="indeterminate"
          :disabled="!curData.length || disabled"
        >
          <slot name="title"> {{ title }} </slot>
        </yc-checkbox>
      </span>
      <span class="yc-transfer-view-header-count">
        <template v-if="!oneWay && !simple">
          {{ curSeleced.length }} /{{ curData.length }}
        </template>
        <yc-icon-button
          v-else-if="type == 'target'"
          :hover-size="20"
          @click="computedValue = []"
        >
          <icon-delete />
        </yc-icon-button>
      </span>
    </div>
    <!-- search -->
    <div v-if="showSearch" class="yc-transfer-view-search">
      <yc-input
        v-model="keywords"
        is-search
        v-bind="inputProps"
        @input="(v) => emits('search', v, type)"
      />
    </div>
    <!--v-if-->
    <div class="yc-transfer-view-body">
      <yc-empty v-if="!curData.length" />
      <yc-scrollbar v-else auto-fill>
        <slot :selectedKeys="curSeleced" :data="curData">
          <div role="list" class="yc-transfer-list">
            <slot
              v-for="item in curData"
              :key="item.value"
              name="list-item"
              :label="item.label"
              :value="item.value"
            >
              <div
                role="listitem"
                :class="{
                  'yc-transfer-list-item': true,
                  'yc-transfer-list-item-disabled': item.disabled || disabled,
                }"
                @click="handleClick(item)"
              >
                <!-- checkbox -->
                <yc-checkbox
                  v-if="(!oneWay || (oneWay && type == 'source')) && !simple"
                  :model-value="curSeleced.includes(item.value as string)"
                  :disabled="item.disabled || disabled"
                  @update:model-value="
                    (isSelected) =>
                      handleCheck(isSelected, item.value as string)
                  "
                >
                  {{ item.label }}
                </yc-checkbox>
                <template v-else>
                  <span>{{ item.label }}</span>
                  <yc-icon-button v-if="type == 'target'" :hover-size="20">
                    <icon-close />
                  </yc-icon-button>
                </template>
              </div>
            </slot>
          </div>
        </slot>
      </yc-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, inject } from 'vue';
import { TransferItem, TransferProvide } from '../type';
import { IconDelete, IconClose } from '@shared/icons';
import { TRANSFER_PROVIDE_KEY } from '@shared/constants';
import YcEmpty from '@/components/Empty';
import YcCheckbox from '@/components/Checkbox';
import YcScrollbar from '@/components/Scrollbar';
import YcIconButton from '@shared/components/IconButton';
import YcInput from '@/components/Input';
const props = defineProps<{
  type: 'source' | 'target';
}>();
const { type } = toRefs(props);
// 结构注入的属性
const {
  computedValue,
  computedSelected,
  targetChecked,
  sourceChecked,
  sourceOptions,
  targetOptions,
  disabled,
  oneWay,
  showSearch,
  showSelectAll,
  simple,
  title: _title,
  sourceInputSearchProps,
  targetInputSearchProps,
  emits,
} = inject<TransferProvide>(TRANSFER_PROVIDE_KEY, {
  computedValue: ref([]),
  computedSelected: ref([]),
  targetChecked: ref([]),
  sourceChecked: ref([]),
  sourceOptions: ref([]),
  targetOptions: ref([]),
  disabled: ref(false),
  oneWay: ref(false),
  simple: ref(false),
  title: ref([]),
  showSearch: ref(false),
  showSelectAll: ref(false),
  sourceInputSearchProps: ref({}),
  targetInputSearchProps: ref({}),
  emits: () => {},
});
// 搜索关键词
const keywords = ref<string>('');
// 当前的data
const curData = computed(() => {
  const options =
    type.value == 'source' ? sourceOptions.value : targetOptions.value;
  return options.filter((item) => {
    return item.label?.toLowerCase().includes(keywords.value.toLowerCase());
  });
});
// 当前的选中
const curSeleced = computed(() => {
  return type.value == 'source' ? sourceChecked.value : targetChecked.value;
});
// inputProps
const inputProps = computed(() => {
  return type.value == 'source'
    ? sourceInputSearchProps.value
    : targetInputSearchProps.value;
});
// title
const title = computed(() => {
  return type.value == 'source' ? _title.value[0] : _title.value[1];
});
// 选中所有
const selectedAll = computed({
  get() {
    return (
      !!curSeleced.value.length &&
      curSeleced.value.length == curData.value.length
    );
  },
  set(isSelected) {
    if (isSelected) {
      computedSelected.value = [
        ...new Set([
          ...computedSelected.value,
          ...curData.value.map((item) => item.value as string),
        ]),
      ];
    } else {
      const dataMap = Object.fromEntries(
        curData.value.map((item) => [item.value, item])
      );
      computedSelected.value = computedSelected.value.filter(
        (item) => !dataMap[item]
      );
    }
  },
});
// 半选
const indeterminate = computed(() => {
  return (
    !!curSeleced.value.length && curSeleced.value.length <= curData.value.length
  );
});
// 处理改变
const handleCheck = (isSelected: boolean, value: string) => {
  computedSelected.value = isSelected
    ? [...computedSelected.value, value]
    : computedSelected.value.filter((v) => v != value);
  emits('selected', computedSelected.value);
};
// 处理清除数据
const handleClick = (item: TransferItem) => {
  const { value } = item;
  if (disabled.value || item.disabled) return;
  if ((!oneWay.value || type.value == 'source') && !simple.value) {
    return;
  }
  computedValue.value =
    type.value == 'source'
      ? [...computedValue.value, value as string]
      : computedValue.value.filter((v) => v != value);
};
</script>

<style lang="less" scoped>
@import '../style/transfer.less';
</style>
