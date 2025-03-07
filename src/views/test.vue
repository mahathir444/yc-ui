<template>
  <div class="test">
    <a-button @click="total += 10">点击total+10</a-button>
    <a-button @click="total -= 10">点击total-10</a-button>
    <yc-scrollbar
      style="height: 200px; width: 100%; overflow: auto"
      ref="scrollbarRef"
    >
      <div
        style="min-height: 200px; background-color: aquamarine; width: 200px"
      >
        <div v-for="i in total" :key="i">{{ i }}</div>
      </div>
    </yc-scrollbar>

    <!--  -->
    <yc-popover trigger="click">
      <a-button>test</a-button>
      <template #content>
        <div style="width: 200px">
          <a-empty />
        </div>
      </template>
    </yc-popover>

    <yc-dropdown @select="handleSelect">
      <a-button>dropdown</a-button>
      <template #content>
        <yc-dsubmenu>
          <span>分组1</span>
          <template #content>
            <yc-dsubmenu>
              <span>分组2</span>
              <template #content>
                <yc-dsubmenu>
                  <span>分组3</span>
                  <template #content>
                    <YcDoption v-for="i in 6" :key="i" :value="i">
                      <template #icon>
                        <IconApps />
                      </template>
                      数字{{ i }}
                    </YcDoption>
                  </template>
                </yc-dsubmenu>
                <YcDoption v-for="i in 6" :key="i" :value="i">
                  <template #icon>
                    <IconApps />
                  </template>
                  数字{{ i }}
                </YcDoption>
              </template>
            </yc-dsubmenu>
            <YcDoption v-for="i in 6" :key="i" :value="i">
              <template #icon>
                <IconApps />
              </template>
              数字{{ i }}
            </YcDoption>
          </template>
        </yc-dsubmenu>
        <YcDoption v-for="i in 6" :key="i" :value="i">
          <template #icon>
            <IconApps />
          </template>
          数字{{ i }}
        </YcDoption>
      </template>
    </yc-dropdown>

    <a-dropdown trigger="hover">
      <a-button>dropdown</a-button>
      <template #content>
        <a-dsubmenu trigger="hover">
          分组1
          <template #content>
            <a-dsubmenu trigger="hover">
              分组2
              <template #content>
                <a-doption v-for="i in 6" :key="i" :value="i">
                  <template #icon>
                    <IconApps />
                  </template>
                  数字{{ i }}
                </a-doption>
              </template>
            </a-dsubmenu>
            <a-doption v-for="i in 6" :key="i" :value="i">
              <template #icon>
                <IconApps />
              </template>
              数字{{ i }}
            </a-doption>
          </template>
        </a-dsubmenu>
      </template>
      <template #footer> sdadsa </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcPopover from '@/packages/Popover';
import YcTooltip from '@/packages/Tooltip';
import YcScrollbar from '@/packages/Scrollbar';
import YcDropdown from '@/packages/Dropdown/Dropdown.vue';
import YcDoption from '@/packages/Dropdown/Doption.vue';
import YcDgroup from '@/packages/Dropdown/DGroup.vue';
import YcDsubmenu from '@/packages/Dropdown/Dsubmenu.vue';
import YcDropdownButton from '@/packages/Dropdown/DropdownButton.vue';
import YcButton, { ButtonGroup as YcButtonGroup } from '@/packages/Button';
const total = ref(1);
const handleSelect = (v: any) => {
  console.log(v);
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
  border-radius: 4px;
}

.loading {
  font-size: 30px;
  &:hover {
    color: blue;
  }
}
</style>
