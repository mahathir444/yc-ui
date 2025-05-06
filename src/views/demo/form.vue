<template>
  <div class="test">
    <div style="width: 300px">
      <yc-select
        :options="options"
        :max-tag-count="3"
        allow-clear
        allow-search
        multiple
        placeholder="select"
      >
      </yc-select>
    </div>
    <div style="width: 300px">
      <yc-input-tag placeholder="input-tag" allow-clear />
    </div>
    <div style="width: 300px">
      <yc-auto-complete placeholder="auto-complete" />
    </div>
    <div style="width: 300px">
      <yc-input
        allow-clear
        placeholder="input"
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
      <yc-time-picker placeholder="time-picker" />
    </div>
    <div style="width: 300px">
      <yc-textarea
        allow-clear
        :max-length="20"
        show-word-limit
        placeholder="textarea"
      />
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
      <yc-input-number placeholder="input-number" />
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
    <div style="width: 300px">
      <yc-slider
        show-input
        :min="30"
        :max="100"
        :marks="{
          10: '10km',
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
const options = ref<any[]>([]);
for (let i = 0; i < 30; i++) {
  options.value.push({
    label: '选项' + i,
    value: i,
  });
}
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
</style>
