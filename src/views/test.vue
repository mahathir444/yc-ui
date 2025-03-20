<template>
  <div class="test">
    <div style="width: 300px">
      select
      <yc-select
        allow-clear
        allow-search
        multiple
        placeholder="请选择"
        :options="[
          {
            label: '分组1',
            isGroup: true,
            options,
          },
        ]"
      >
        <template #prefix>
          <div>测试测</div>
        </template>
      </yc-select>
    </div>
    <div style="width: 300px">
      input-tag
      <yc-input-tag
        placeholder="请输入"
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
      input
      <yc-input allow-clear :max-length="100" show-word-limit />
    </div>
    <div style="width: 300px">
      text-area
      <yc-textarea allow-clear :max-length="100" show-word-limit />
    </div>

    <div style="width: 300px">
      <a-select
        placeholder="请选择"
        allow-search
        allow-clear
        :show-extra-options="true"
        :options="[
          {
            label: '分组1',
            isGroup: true,
            options,
          },
        ]"
      >
      </a-select>
    </div>
    <div style="width: 300px">
      <a-input-tag v-model="value1" allow-clear placeholder="请输入">
        <template #suffix>
          <icon-align-center />
        </template>
      </a-input-tag>
    </div>
    <div style="width: 300px">
      <yc-dropdown trigger="hover">
        <yc-button> 测试 </yc-button>
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
                      <yc-doption v-for="i in 6" :value="i">{{ i }}</yc-doption>
                    </template>
                  </yc-dsubmenu>
                  <yc-doption v-for="i in 6" :value="i">{{ i }}</yc-doption>
                </template>
              </yc-dsubmenu>
              <yc-doption v-for="i in 6" :value="i">{{ i }}</yc-doption>
            </template>
          </yc-dsubmenu>
          <yc-doption v-for="i in 6" :value="i">{{ i }}</yc-doption>
        </template>
      </yc-dropdown>
      <yc-trigger trigger="click" is-nested>
        <yc-button> 测试 </yc-button>
        <template #content>
          <div class="popover-content">
            <a-empty />
            <yc-trigger trigger="click" is-nested>
              <yc-button> 测试 </yc-button>
              <template #content>
                <div class="popover-content">
                  <a-empty />
                  <yc-trigger trigger="click" is-nested>
                    <yc-button> 测试 </yc-button>
                    <template #content>
                      <div class="popover-content">
                        <a-empty />
                        <yc-trigger trigger="click" is-nested>
                          <yc-button> 测试 </yc-button>
                          <template #content>
                            <div class="popover-content">
                              <a-empty />
                            </div>
                          </template>
                        </yc-trigger>
                      </div>
                    </template>
                  </yc-trigger>
                </div>
              </template>
            </yc-trigger>
          </div>
        </template>
      </yc-trigger>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';

const value = ref([]);
const value1 = ref([]);
const options = ref<any[]>([]);
for (let i = 0; i < 20; i++) {
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

.popover-content {
  width: 200px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
}
</style>
