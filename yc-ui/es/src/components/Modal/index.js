import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { getComponentPrefix } from "../_utils/global-config.js";
import _sfc_main from "./component/ServiceModal.vue.js";
import "./component/ServiceModal.vue2.js";
import _Modal from "./index.vue.js";
import { h } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { render } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
const modalConfig = {
  id: "ycServiceModalContainer",
  container: null
};
const Modal = Object.assign(_Modal, {
  install: (app) => {
    app.component(getComponentPrefix() + _Modal.name, _Modal);
  },
  open(props) {
    if (!modalConfig.container) {
      const container = document.createElement("div");
      container.id = modalConfig.id;
      modalConfig.container = container;
      document.body.append(container);
    }
    const close = () => {
      render(null, modalConfig.container);
    };
    const { onOk: handleOk, onCancel: handleCancel } = props;
    const vnode = h(_sfc_main, {
      ...props,
      async onOk() {
        if (!handleOk)
          return;
        await handleOk();
        close();
      },
      async onCancel() {
        if (!handleCancel)
          return;
        await handleCancel();
        close();
      }
    });
    render(vnode, modalConfig.container);
    return {
      close
    };
  }
});
export {
  Modal as default
};
