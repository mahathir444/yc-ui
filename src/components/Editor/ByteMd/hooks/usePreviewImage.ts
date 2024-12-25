import { onMounted, onBeforeUnmount, ref } from 'vue';
// 处理预览
export default (id: string) => {
  let editor: HTMLDivElement | null = null;
  // 当前预览的连接
  const curUrl = ref('');
  // 处理预览
  const handlePreview = (e: any) => {
    const src = e.target?.src;
    if (!src) return;
    curUrl.value = src;
  };
  onMounted(() => {
    editor = document.getElementById(id) as HTMLDivElement;
    if (!editor) return;
    editor.addEventListener('click', handlePreview);
  });
  onBeforeUnmount(() => {
    if (!editor) return;
    editor.addEventListener('click', handlePreview);
  });
  return {
    curUrl,
  };
};
