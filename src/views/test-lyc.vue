<template>
  <div class="test">
    <yc-comment
      author="Socrates"
      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      content="Comment body content."
      datetime="1 hour"
    >
      <template #actions>
        <span class="action"> <IconMessage /> Reply </span>
      </template>
      <yc-comment
        author="Balzac"
        avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
        content="Comment body content."
        datetime="1 hour"
      >
        <template #actions>
          <span class="action"> <IconMessage /> Reply </span>
        </template>
        <yc-comment
          author="Austen"
          avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
          content="Reply content"
          datetime="1 hour"
        >
          <template #actions>
            <span class="action"> <IconMessage /> Reply </span>
          </template>
        </yc-comment>
        <yc-comment
          author="Plato"
          avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          content="Reply content"
          datetime="1 hour"
        >
          <template #actions>
            <span class="action"> <IconMessage /> Reply </span>
          </template>
        </yc-comment>
      </yc-comment>
    </yc-comment>
    <yc-collapse style="width: fit-content; height: fit-content">
      <yc-collapse-item title="Beijing Toutiao Technology Co., Ltd." value="1">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </yc-collapse-item>
      <yc-collapse-item
        title="Beijing Toutiao Technology Co., Ltd."
        :value="2"
        disabled
      >
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </yc-collapse-item>
      <yc-collapse-item title="Beijing Toutiao Technology Co., Ltd." value="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </yc-collapse-item>
    </yc-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
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
