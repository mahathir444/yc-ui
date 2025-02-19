import { defineComponent, h } from 'vue';
export default (mountedCb: (ctx: any) => void) => {
  return defineComponent({
    props: ['vnode'],
    mounted() {
      mountedCb(this);
    },
    render(props: any) {
      return props.vnode;
    },
  });
};
