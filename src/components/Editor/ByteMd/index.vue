<template>
  <div class="byte-md-container">
    <ByteMdEditor
      id="byteEditor"
      mode="split"
      :value="modelValue"
      :locale="zhHans"
      :plugins="plugins"
      :uploadImages="uploadImages"
      :previewDebounce="100"
      placeholder="请输入..."
      ref="editor"
      @change="handleChange" />
    <a-image-preview
      :visible="!!curUrl"
      :src="curUrl"
      @close="curUrl = ''" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRefs } from 'vue';
import { taskRunner, compressImage } from '@/utils/fn';
import { Editor as ByteMdEditor } from '@bytemd/vue-next';
import { BytemdEditorContext } from 'bytemd';
import { Message } from '@arco-design/web-vue';
import 'bytemd/dist/index.css';
import gfm from '@bytemd/plugin-gfm';
import zhHans from 'bytemd/locales/zh_Hans.json';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import highlight from '@bytemd/plugin-highlight';
import gemoji from '@bytemd/plugin-gemoji';
import math from '@bytemd/plugin-math';
import breaks from '@bytemd/plugin-breaks';
import mermaid from '@bytemd/plugin-mermaid';
import externalLinks from '@bytemd/plugin-external-links';
import pluginMermaidZhHans from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import pluginGfmZhHans from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import pluginMathZhHans from '@bytemd/plugin-math/locales/zh_Hans.json';
import themePlugin from './plugins/themePlugins';
import alignPlugin from './plugins/alignPlugin';
import imageScalePlugin from './plugins/imageScalePlugins';
import usePreviewImage from './hooks/usePreviewImage';

const props = defineProps<{
  modelValue: string;
}>();
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
const { modelValue } = toRefs(props);
// editor实例
const editor = ref(null);
// 声明所有的插件
const plugins = [
  gfm({ locale: pluginGfmZhHans }),
  highlight(),
  gemoji(),
  // 居中插件
  alignPlugin(),
  // 图片缩放
  imageScalePlugin(),
  // 数学公式
  math({ locale: pluginMathZhHans }),
  // 图
  mermaid({ locale: pluginMermaidZhHans }),
  breaks(),
  footnotes(),
  // 字体格式化
  frontmatter(),
  // 连接处理插件
  externalLinks({ test: (_href: string) => true }),
  // 主题高亮插件
  themePlugin(),
];
// 预览hook
const { curUrl } = usePreviewImage('byteEditor');
// 处理变更
const handleChange = (value: string) => {
  emits('update:modelValue', value);
};
// 上传图片
const uploadImages = async (_files: File[]) => {
  // console.log('uploadFiles', files);
  // // 转换请求lst
  // const requestList = files.map((file) => {
  //   return async () => {
  //     try {
  //       const compressFile = await compressImage(file, 0.6, 10000, 10000);
  //       const formData = new FormData();
  //       formData.append('files', compressFile);
  //       const { data } = await uploadFile(formData);
  //       return data;
  //     } catch (err: any) {
  //       Message.error(err?.message);
  //     }
  //   };
  // });
  // const urls = await taskRunner(requestList, 10);
  // console.log('urls', urls);
  // return [
  //   {
  //     title: files.map((i) => i.name),
  //     url: urls.map((item) => item.url),
  //   },
  // ];
  return [];
};
//初始化编辑器
const initEditor = () => {
  // 右边工具
  const rightTools = document.querySelectorAll(
    '#byteEditor .bytemd-toolbar-right .bytemd-tippy-right'
  ) as NodeListOf<HTMLDivElement>;
  rightTools.forEach((node) => {
    // 1.目录,2帮助,3仅编辑区,4恢复默认,5全屏,6源码
    const path = +(node.getAttribute('bytemd-tippy-path') as string);
    if (path == 2) {
      node.click();
    }
  });
};

onMounted(() => {
  initEditor();
});
</script>

<style lang="less">
.byte-md-container {
  height: 100%;
  width: 100%;

  #byteEditor {
    height: 100%;
    width: 100%;

    .bytemd {
      height: 100%;
      width: 100%;
      border: none !important;
      // background-color: #f2f2f2;
      &.bytemd-fullscreen {
        border-radius: 10px !important;
        overflow: hidden;
        z-index: 100;
        border: 1px solid #e9e9e9 !important;
      }
      .bytemd-toolbar {
        // background-color: #f2f2f2;
        border-bottom: 1px solid #e5e6eb;
        .bytemd-toolbar-icon {
          -webkit-app-region: no-drag;
        }
      }
      .bytemd-body {
        .bytemd-editor {
          .cm-s-default {
            // background-color: #f2f2f2;
          }
        }
        .bytemd-preview {
          // background-color: #fff;
          .markdown-body {
            ul {
              list-style-type: disc; /* 无序列表样式 */
              margin-left: 20px;
            }
            ol {
              list-style-type: decimal; /* 有序列表样式 */
              margin-left: 20px;
            }
            img {
              cursor: pointer;
            }
            em,
            i {
              font-style: italic;
            }
          }
        }
      }
    }
  }
}
</style>
