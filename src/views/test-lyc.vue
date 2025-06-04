<template>
  <div class="test">
    <yc-comment
      align="right"
      author="Balzac"
      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      content="A design is a plan or specification for the construction of an object
          or system or for the implementation of an activity or process, or the
          result of that plan or specification in the form of a prototype,
          product or process."
      datetime="1 hour"
    >
      <template #actions>
        <span class="action"> <IconMessage /> Reply </span>
      </template>
      <yc-comment
        align="right"
        avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      >
        <template #actions>
          <yc-button key="0" type="secondary"> Cancel </yc-button>
          <yc-button key="1" type="primary"> Reply </yc-button>
        </template>
        <template #content>
          <yc-input placeholder="Here is you content." />
        </template>
      </yc-comment>
    </yc-comment>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
const position = ref('left');
const hideIcon = ref(false);
const like = ref(false);
const star = ref(false);
const onLikeChange = () => {
  like.value = !like.value;
};
const onStarChange = () => {
  star.value = !star.value;
};
</script>

<style lang="less" scoped>
.test {
  height: 150vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  gap: 10px;
}
</style>
