<template>
  <div class="test">
    <!-- affix -->
    <yc-affix :offset-top="0">
      <yc-button>affix</yc-button>
    </yc-affix>
    <!-- anchor -->
    <yc-anchor>
      <yc-anchor-link href="#basic">Basic</yc-anchor-link>
      <yc-anchor-link href="#line-less">LineLess Mode</yc-anchor-link>
      <yc-anchor-link href="#affix">
        Affix
        <template #sublist>
          <yc-anchor-link href="#boundary">Scroll Boundary</yc-anchor-link>
          <yc-anchor-link href="#hash">Hash mode</yc-anchor-link>
        </template>
      </yc-anchor-link>
    </yc-anchor>
    <!-- back-top -->
    <yc-back-top />
    <!-- resize-box -->
    <yc-resize-box
      :directions="['bottom', 'left', 'top', 'right']"
      style="height: 300px"
    >
      <div
        style="
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        ResizeBox
      </div>
    </yc-resize-box>
    <!-- trigger -->
    <yc-trigger>
      <yc-button>trigger</yc-button>
      <template #content>
        <yc-empty
          style="
            height: 100px;
            width: 180px;
            border: 1px solid rgb(229, 230, 235);
            border-radius: 4px;
            box-shadow: 0 4px 10px #0000001a;
          "
        />
      </template>
    </yc-trigger>
    <!-- split -->
    <yc-split style="height: 300px">
      <template #first>
        <div style="background-color: aqua; width: 400px; height: 100%">
          split
        </div>
      </template>
      <template #second>
        <div style="background-color: antiquewhite; width: 400px; height: 100%">
          split
        </div>
      </template>
    </yc-split>
    <!-- scrollbar -->
    <yc-scrollbar style="height: 200px; width: 300px">
      <div
        style="
          height: 2000px;
          padding-top: 100px;
          padding-left: 100px;

          background-color: var(--color-primary-light-4);
        "
      >
        scrollbar
      </div>
    </yc-scrollbar>
    <!-- watermark -->
    <yc-watermark content="water-mark">
      <div style="width: 1000px; height: 350px" />
    </yc-watermark>
  </div>
</template>

<style lang="less" scoped>
.test {
  height: 150vh;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
