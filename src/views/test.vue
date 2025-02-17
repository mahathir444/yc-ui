<template>
  <div class="test">
    <!-- <yc-drawer
      :default-visible="true"
      title="这是一个测试这是一个测试这是一个测试"
    >
      这是一个测试drawer
    </yc-drawer> -->
    <!-- 
    <yc-modal
      v-model:visible="visible"
      draggable
      :mask-closable="false"
      title="测试yc"
    >
    </yc-modal> -->

    <!-- <a-modal
      :visible="true"
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
      <a-input-password allow-clear>
        <template #prefix>
          <icon-desktop />
        </template>
        <template #prepend> +86 </template>
        <template #suffix>
          <icon-pen-fill />
        </template>
        <template #append> RMB </template>
      </a-input-password>
    </div>

    <div>
      <span>yc</span>
      <yc-input-password model-value="123">
        <yc-input-search>
          <template #prefix>
            <icon-desktop />
          </template>
          <template #prepend> +86 </template>
          <template #suffix>
            <icon-pen-fill />
          </template>
          <template #append> RMB </template>
        </yc-input-search>
      </yc-input-password>
    </div>

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
      <yc-input-search default-value="123123" @search="(v) => console.log(v)">
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
      <a-input
        allow-clear
        error
        v-model="text"
        default-value="123123"
        :word-length="calcLength"
        show-word-limit
      >
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
      <yc-input
        v-model="text1"
        :max-length="10"
        :word-length="calcLength"
        show-word-limit
      >
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
import { ref, toRefs } from 'vue';
import YcDrawer from '@/packages/Drawer';
import YcButton from '@/packages/Button';
import YcLink from '@/packages/Link';
import YcModal, { ModalService } from '@/packages/Modal';
import {
  Input as YcInput,
  InputSearch as YcInputSearch,
  InputPassword as YcInputPassword,
} from '@/packages/Input';

const visible = ref<boolean>(false);
const text = ref<string>('');
const text1 = ref<string>('');
const text2 = ref<string>('');

const calcLength = (value: string) => {
  return value.length - 2;
};

const handleClick = () => {
  console.log('12312');

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
