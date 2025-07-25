<template>
  <div class="form">
    <div style="width: 300px">
      <yc-input
        allow-clear
        placeholder="input"
        show-word-limit
        :max-length="100"
      />
    </div>
    <div style="width: 300px">
      <yc-textarea
        allow-clear
        show-word-limit
        :max-length="100"
        placeholder="textarea"
      />
    </div>
    <div style="width: 300px">
      <yc-input-tag placeholder="input-tag" allow-clear />
    </div>
    <div style="width: 300px">
      <yc-input-number placeholder="input-number" :precision="1" :min="0" />
    </div>
    <div style="width: 300px">
      <yc-select allow-clear multiple placeholder="select">
        <yc-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </yc-option>
      </yc-select>
    </div>
    <div style="width: 300px">
      <yc-cascader
        :options="option1s"
        :multiple="true"
        placeholder="cascader"
      />
    </div>
    <div style="width: 300px">
      <yc-mention
        :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
        type="textarea"
        placeholder="mention"
      />
    </div>
    <div style="width: 300px">
      <yc-auto-complete placeholder="auto-complete" />
    </div>
    <div style="width: 300px">
      <yc-time-picker placeholder="time-picker" />
    </div>
    <div style="width: 300px">
      <yc-checkbox-group>
        <yc-checkbox v-for="i in 5" :key="i" :value="i"
          >选项{{ i }}
        </yc-checkbox>
      </yc-checkbox-group>
    </div>
    <div style="width: 300px">
      <yc-radio-group>
        <yc-radio v-for="i in 5" :key="i" :value="i">选项{{ i }} </yc-radio>
      </yc-radio-group>
    </div>
    <div style="width: 300px">
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
      <yc-rate :count="5" allow-clear />
    </div>
    <div style="width: 300px">
      <yc-color-picker show-text show-preset size="large" />
    </div>
    <div style="width: 400px">
      <yc-verification-code
        :formatter="
          (inputValue, index, v) => {
            console.log(inputValue, index, v, 'formater');
            return inputValue + '-' + index;
          }
        "
      />
    </div>
    <div>
      <yc-transfer :data="options" show-search />
    </div>
    <div style="width: 700px">
      <yc-slider
        show-input
        :min="0"
        :max="100"
        :marks="{
          30: '30km',
          60: '60km',
          90: '90km',
        }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const options = ref<any[]>(
  new Array(30).fill('').map((_v, i) => {
    return {
      label: '选项' + i,
      value: i,
    };
  })
);
const option1s = [
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'chaoyang',
        label: 'ChaoYang',
        children: [
          {
            value: 'datunli',
            label: 'Datunli',
          },
        ],
      },
      {
        value: 'haidian',
        label: 'Haidian',
      },
      {
        value: 'dongcheng',
        label: 'Dongcheng',
      },
      {
        value: 'xicheng',
        label: 'Xicheng',
        children: [
          {
            value: 'jinrongjie',
            label: 'Jinrongjie',
          },
          {
            value: 'tianqiao',
            label: 'Tianqiao',
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: [
      {
        value: 'huangpu',
        label: 'Huangpu',
      },
    ],
  },
];
</script>

<style lang="less" scoped>
.form {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
