<template>
  <div class="test">
    <div style="width: 300px; height: 300px">
      <yc-slider
        v-model="value"
        show-input
        :marks="{
          10: '10km',
          30: '30km',
          60: '60km',
          90: '90km',
        }"
      />
      <!-- <yc-input-number
        v-model="value"
        :step="1.2"
        :precision="1"
        :min="2"
        :max="13"
        placeholder="请输入"
      ></yc-input-number> -->
    </div>
    <div style="width: 300px; height: 300px">
      <!-- <mention :data="options" />
      <yc-auto-complete :data="options" /> -->
      <yc-dropdown>
        <yc-button>测试嵌套</yc-button>
        <template #content>
          <yc-dsubmenu>
            分组1
            <template #content>
              <yc-dsubmenu>
                分组2
                <template #content>
                  <yc-dsubmenu>
                    分组3
                    <template #content>
                      <yc-dsubmenu>
                        分组4
                        <template #content>
                          <yc-doption v-for="i in 6" :key="i" :value="i">
                            选项{{ i }}
                          </yc-doption>
                        </template>
                      </yc-dsubmenu>
                      <yc-doption v-for="i in 6" :key="i" :value="i">
                        选项{{ i }}
                      </yc-doption>
                    </template>
                  </yc-dsubmenu>
                  <yc-doption v-for="i in 6" :key="i" :value="i">
                    选项{{ i }}
                  </yc-doption>
                </template>
              </yc-dsubmenu>
              <yc-doption v-for="i in 6" :key="i" :value="i">
                选项{{ i }}
              </yc-doption>
            </template>
          </yc-dsubmenu>
          <yc-doption v-for="i in 6" :key="i" :value="i">
            选项{{ i }}
          </yc-doption>
        </template>
      </yc-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import OverflowList from '@/components/OverflowList/index.vue';
import Mention from '@/components/Mention/index.vue';
const value = ref(0);
const options = ['Bytedance', 'Bytedesign', 'Bytenumner'].map((item) => {
  return {
    label: item,
    value: item,
  };
});
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
