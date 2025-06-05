<template>
  <div class="test">
    <yc-button @click="handleClick">Open Modal</yc-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
const ModalContent = {
  setup() {
    const onClick = () => {
      Modal.info({
        title: 'Info Title',
        content: 'This is an nest info message',
      });
    };

    return () =>
      h('div', { class: 'info-modal-content' }, [
        h('span', { style: 'margin-bottom: 10px;' }, 'This is an info message'),
        h(Button, { size: 'mini', onClick }, 'Open Nest Modal'),
      ]);
  },
};
const handleClick = () => {
  Modal.info({
    title: 'Info Title',
    content: () => h(ModalContent),
  });
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
  .grid-demo-grid .demo-item,
  .grid-demo-grid .demo-suffix {
    height: 48px;
    line-height: 48px;
    color: var(--color-white);
    text-align: center;
  }

  .grid-demo-grid .demo-item:nth-child(2n) {
    background-color: rgba(var(--arcoblue-6), 0.9);
  }

  .grid-demo-grid .demo-item:nth-child(2n + 1) {
    background-color: var(--color-primary-light-4);
  }
}
</style>
