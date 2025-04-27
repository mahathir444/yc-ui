import { ref, inject } from 'vue';
import { GridProvide } from '../type';
import { GRID_PROVIDE_KEY } from '@shared/constants';

export default () => {
  return inject<GridProvide>(GRID_PROVIDE_KEY, {
    gutter: ref(0),
    breakpoint: ref('xs'),
    div: ref(false),
    colGap: ref(0),
    cols: ref(24),
  });
};
