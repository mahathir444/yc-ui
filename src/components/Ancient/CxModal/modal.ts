import { createVNode, render,ref } from 'vue'
import CxModal from '@/components/CxModal/index.vue';
const div = document.createElement('div');
div.setAttribute('class', 'cx-modal-container')
document.body.appendChild(div);
export const useConfirmModal = ({ tip, ok, cancel }: { tip: string, ok: () => void, cancel: () => void }) => {
  const visible = ref(true);
  const close = () =>{
    visible.value = false;
    render(null, div);
  }
  const vnode = createVNode(CxModal, {
    tip,
    visible,
    onOk:()=>{
      ok();
      close();
    },
    onCancel: () => {
      cancel();
      close();
    },
  });
  render(vnode, div);
};