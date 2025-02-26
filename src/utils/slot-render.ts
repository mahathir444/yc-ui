import { defineComponent, VNode } from 'vue';

export default (mountedCb: (...args: any) => void) => {
  return defineComponent({
    props: ['vNodes'],
    mounted() {
      mountedCb(this.$el);
    },
    render(props: Record<string, any>) {
      return props.vNodes;
    },
  });
};
