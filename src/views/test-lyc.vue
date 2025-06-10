<template>
  <div class="test">
    <div :style="{ marginTop: '20px' }">
      <yc-checkbox-group :default-value="[1]">
        <template v-for="item in 2" :key="item">
          <yc-checkbox :value="item">
            <template #checkbox="{ checked }">
              <yc-space
                align="start"
                class="custom-checkbox-card"
                :class="{ 'custom-checkbox-card-checked': checked }"
              >
                <div className="custom-checkbox-card-mask">
                  <div className="custom-checkbox-card-mask-dot" />
                </div>
                <div>
                  <div className="custom-checkbox-card-title">
                    Checkbox Card {{ item }}
                  </div>
                  <yc-typography-text type="secondary">
                    this is a text
                  </yc-typography-text>
                </div>
              </yc-space>
            </template>
          </yc-checkbox>
        </template>
      </yc-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkedValue = ref(['1', '2']);
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
  overflow: hidden;
}

.custom-checkbox-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
  box-sizing: border-box;
}

.custom-checkbox-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-checkbox-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.custom-checkbox-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-checkbox-card:hover,
.custom-checkbox-card-checked,
.custom-checkbox-card:hover .custom-checkbox-card-mask,
.custom-checkbox-card-checked .custom-checkbox-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-checkbox-card:hover .custom-checkbox-card-title,
.custom-checkbox-card-checked .custom-checkbox-card-title {
  color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>
