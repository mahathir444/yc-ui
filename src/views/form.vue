<template>
  <div class="test">
    <div style="width: 300px">
      select
      <yc-select
        allow-clear
        allow-search
        multiple
        placeholder="请选择"
        :max-tag-count="3"
      >
        <yc-optgroup label="分组1">
          <yc-option
            v-for="item in options"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </yc-optgroup>
      </yc-select>
    </div>
    <div style="width: 300px">
      input-tag
      <yc-input-tag
        placeholder="请输入"
        :default-value="[1, 2, 3]"
        :max-tag-count="7"
        :field-names="{
          label: 'text',
          value: 'key',
        }"
        allow-clear
      />
    </div>
    <div style="width: 300px">
      auto-complete
      <yc-auto-complete />
    </div>
    <div style="width: 300px">
      time-picker
      <yc-time-picker />
    </div>
    <div style="width: 300px">
      input
      <yc-input
        allow-clear
        :max-length="{
          length: 8,
          errorOnly: true,
        }"
        :word-length="(value) => value.length - 2"
        :word-slice="(value, maxLength) => value.slice(1, maxLength + 1)"
        show-word-limit
      />
      <a-input
        allow-clear
        :max-length="{
          length: 8,
          errorOnly: true,
        }"
        :word-length="(value) => value.length - 2"
        :word-slice="(value, maxLength) => value.slice(1, maxLength + 1)"
        show-word-limit
      />
    </div>
    <div style="width: 300px">
      text-area
      <yc-textarea allow-clear :max-length="20" show-word-limit />
    </div>
    <div style="width: 500px">
      checkbox
      <yc-checkbox-group>
        <yc-checkbox v-for="i in 5" :key="i" :value="i"
          >选项{{ i }}
        </yc-checkbox>
      </yc-checkbox-group>
    </div>
    <div style="width: 500px">
      radio
      <yc-radio-group>
        <yc-radio v-for="i in 5" :key="i" :value="i">选项{{ i }} </yc-radio>
      </yc-radio-group>
    </div>
    <div style="width: 300px">
      inputNumber
      <yc-input-number
        :formatter="formatter"
        :parser="parser"
        placeholder="请输入"
      ></yc-input-number>
    </div>
    <div style="width: 300px">
      switch
      <yc-switch checked-text="启动" unchecked-text="关闭">
        <template #checked-icon>
          <icon-check />
        </template>
        <template #unchecked-icon>
          <icon-close />
        </template>
      </yc-switch>
    </div>
    <div>
      rate
      <yc-rate :count="5" allow-half allow-clear />
    </div>
    <div style="width: 300px">
      slider
      <yc-slider
        show-input
        :marks="{
          10: '10km',
          30: '30km',
          60: '60km',
          90: '90km',
        }"
      />
    </div>
    <div style="width: 300px">
      mention
      <yc-mention :data="options" placeholder="mention" />
    </div>
    <div style="width: 300px">
      <yc-color-picker show-text show-preset size="large" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcAutoComplete from '@/components/AutoComplete';
const value = ref([]);
const value1 = ref([]);
const options = ref<any[]>([]);
for (let i = 0; i < 20; i++) {
  options.value.push({
    label: '选项' + i,
    value: i,
  });
}
const formatter = (value: string) => {
  const values = value.split('.');
  values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return values.join('.');
};

const parser = (value: string) => {
  return value.replace(/,/g, '');
};
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.popover-content {
  width: 200px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
}
</style>
