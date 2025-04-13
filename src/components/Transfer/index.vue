<template>
  <div class="yc-transfer">
    <div class="arco-transfer-view arco-transfer-view-source">
      <div class="arco-transfer-view-header">
        <span class="arco-transfer-view-header-title"
          ><label class="arco-checkbox"
            ><input
              type="checkbox"
              class="arco-checkbox-target"
              value="false"
            /><span class="arco-icon-hover arco-checkbox-icon-hover"
              ><div class="arco-checkbox-icon"><!----></div></span
            ><span class="arco-checkbox-label">Source</span></label
          ></span
        ><span class="arco-transfer-view-header-count">0 / 0</span>
      </div>
      <!--v-if-->
      <div class="arco-transfer-view-body">
        <div class="arco-empty arco-transfer-view-empty">
          <div class="arco-empty-image">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              class="arco-icon arco-icon-empty"
              stroke-width="4"
              stroke-linecap="butt"
              stroke-linejoin="miter"
            >
              <path
                d="M24 5v6m7 1 4-4m-18 4-4-4m28.5 22H28s-1 3-4 3-4-3-4-3H6.5M40 41H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z"
              ></path>
            </svg>
          </div>
          <div class="arco-empty-description">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import YcEmpty from "@/compoents/"
</script>

<style lang="less" scoped></style>
