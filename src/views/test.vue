<template>
  <div class="test">
    <yc-drawer
      v-model:visible="visible"
      title="这是一个测试这是一个测试这是一个测试"
    >
      这是一个测试drawer
    </yc-drawer>
    <!-- 
    <yc-modal
      v-model:visible="visible"
      draggable
      :mask-closable="false"
      title="测试yc"
    >
    </yc-modal> -->

    <!-- <a-modal
      v-model:visible="visible"
      title="测试arco"
      draggable
      :mask-closable="false"
      @cancel="console.log('关闭了')"
    >
      <div>sdadsa</div>
    </a-modal> -->

    <yc-button type="primary" @click="handleClick">
      <template #icon>
        <svg-icon name="close" />
      </template>
      测试按钮
    </yc-button>

    <div>
      <span>arco</span>
      <a-input-search @search="(v) => console.log(v)">
        <template #prefix>
          <svg-icon name="loading" />
        </template>
        <template #prepend> +86 </template>
        <template #suffix>
          <icon-pen-fill />
        </template>
        <template #append> RMB </template>
      </a-input-search>
    </div>

    <div>
      <span>yc</span>
      <yc-input-search
        default-value="123123"
        search-button
        @search="(v: string) => console.log(v)"
      >
        <template #prefix>
          <icon-desktop />
        </template>
        <template #prepend> +86 </template>
        <template #suffix>
          <icon-pen-fill />
        </template>
        <template #append> RMB </template>
      </yc-input-search>
    </div>
    <!--  -->
    <div>
      <span>arco</span>
      <a-input :default-value="text" show-word-limit>
        <template #prefix>
          <svg-icon name="loading" />
        </template>
        <template #prepend> +86 </template>
        <template #suffix>
          <icon-pen-fill />
        </template>
        <template #append> RMB </template>
      </a-input>
    </div>
    <div>
      <span>yc</span>

      <yc-input :max-length="10" show-word-limit>
        <template #prefix>
          <svg-icon name="loading" />
        </template>
        <template #prepend> +86 </template>
        <template #suffix>
          <icon-pen-fill />
        </template>
        <template #append> RMB </template>
      </yc-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Input } from '@arco-design/web-vue';
import YcDrawer from '@/packages/Drawer';
import YcButton from '@/packages/Button';
import YcLink from '@/packages/Link';
import YcModal from '@/packages/Modal';
import YcInput, {
  InputSearch as YcInputSearch,
  InputPassword as YcInputPassword,
} from '@/packages/Input';

const visible = ref<boolean>(false);
const text = ref<string>('');
const text1 = ref<string>('');
const text2 = ref<string>('');

watch(
  () => text1.value,
  () => {
    console.log(text1.value, 'text1');
  }
);
const handleClick = () => {
  visible.value = true;
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
</style>
