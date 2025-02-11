import ServiceModal from './component/ServiceModal.vue';
import { h, render } from 'vue';
import { ModalConfig } from './type/interface';

const id = 'ycServiceModalContainer';
if (!document.getElementById(id)) {
  const modalContainer = document.createElement('div');
  modalContainer.id = id;
  document.body.append(modalContainer);
}
// server服务
export const ModalService = (props: ModalConfig) => {
  //  大的容器
  const modalContainer = document.getElementById(id) as HTMLDivElement;
  const { onOk: handleOk, onCancel: handleCancel } = props;
  // 使用 h 函数创建 VNode
  const vnode = h(ServiceModal, {
    ...props,
    async onOk() {
      if (!handleOk) return;
      await handleOk();
      render(null, modalContainer);
    },
    async onCancel() {
      if (!handleCancel) return;
      await handleCancel();
      render(null, modalContainer);
    },
  });
  // 渲染 VNode 到容器
  render(vnode, modalContainer);
};
