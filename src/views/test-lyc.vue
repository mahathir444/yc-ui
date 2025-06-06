<template>
  <div class="test">
    <yc-dropdown>
      <yc-button>Click Me</yc-button>
      <template #content>
        <yc-doption>
          <template #icon>
            <icon-location />
          </template>
          <template #default>Option 1</template>
        </yc-doption>
        <yc-doption>
          <template #icon>
            <icon-location />
          </template>
          <template #default>Option 2</template>
        </yc-doption>
        <yc-doption>
          <template #icon>
            <icon-location />
          </template>
          <template #default>Option 3</template>
        </yc-doption>
      </template>
    </yc-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
const handleSelect = (v) => {
  console.log(v);
};
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
