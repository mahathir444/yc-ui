import { App, h, render } from 'vue';
import { ModalConfig, ModalServiceData } from './type';
import { getComponentPrefix } from '@/components/_utils/global-config';
import ServiceModal from './component/ServiceModal.vue';
import _Modal from './index.vue';

export type ModalInstance = InstanceType<typeof _Modal>;

export type { ModalConfig, ModalProps } from './type';

// 记录modal数据
const modalConfig: ModalServiceData = {
  id: 'ycServiceModalContainer',
  container: null,
};

const Modal = Object.assign(_Modal, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Modal.name, _Modal);
  },
  open(props: ModalConfig) {
    if (!modalConfig.container) {
      const container = document.createElement('div');
      container.id = modalConfig.id;
      modalConfig.container = container;
      document.body.append(container);
    }
    // 关闭函数
    const close = () => {
      render(null, modalConfig.container as HTMLDivElement);
    };
    const { onOk: handleOk, onCancel: handleCancel } = props;
    // 使用 h 函数创建 VNode
    const vnode = h(ServiceModal, {
      ...props,
      async onOk() {
        if (!handleOk) return;
        await handleOk();
        close();
      },
      async onCancel() {
        if (!handleCancel) return;
        await handleCancel();
        close();
      },
    });
    // 渲染 VNode 到容器
    render(vnode, modalConfig.container);
    return {
      close,
    };
  },
});

export default Modal;
