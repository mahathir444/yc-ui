<template>
  <div class="test">
    <div style="width: 300px">
      <yc-select v-model="value" placeholder="请选择">
        <yc-optgroup label="分组1">
          <yc-option v-for="i in 20" :key="i" :value="i" :label="`选项${i}`">
          </yc-option>
        </yc-optgroup>
      </yc-select>
    </div>

    <div>
      <yc-popover trigger="click">
        <yc-button>测试</yc-button>
        <template #content>
          <a-checkbox-group v-model="value1" :max="3">
            <a-checkbox v-for="i in 5" :key="i" :value="i">
              测试{{ i }}
            </a-checkbox>
          </a-checkbox-group>
        </template>
      </yc-popover>
    </div>
    <div>
      <yc-dropdown>
        <yc-button>测试</yc-button>
        <template #content>
          <yc-dsubmenu>
            选项0
            <template #content>
              <yc-dsubmenu>
                选项0
                <template #content>
                  <yc-doption v-for="i in 5" :key="i" :value="i">
                    选项{{ i }}
                  </yc-doption>
                </template>
              </yc-dsubmenu>
              <yc-doption v-for="i in 5" :key="i" :value="i">
                选项{{ i }}
              </yc-doption>
            </template>
          </yc-dsubmenu>
          <yc-doption v-for="i in 5" :key="i" :value="i">
            选项{{ i }}
          </yc-doption>
        </template>
      </yc-dropdown>
    </div>

    <div>
      <yc-checkbox-group v-model="value1" :max="3">
        <YcCheckbox v-for="i in 5" :key="i" :value="i">
          测试{{ i }}
        </YcCheckbox>
      </yc-checkbox-group>
    </div>

    <div style="width: 300px">
      <a-select placeholder="请选择" allow-search allow-clear>
        <a-option
          v-for="i in 6"
          :key="i"
          :value="i"
          :index="6 - i"
          :label="i.toString()"
        >
          <template #icon>
            <icon-align-center />
          </template>
          test{{ i }}
          <template #suffix>
            <icon-align-center />
          </template>
        </a-option>
      </a-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
const total = ref(1);
const value = ref([]);
const value1 = ref([]);
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
