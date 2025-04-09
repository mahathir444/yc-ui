import { App } from 'vue';
import _Skeleton from './Skeleton.vue';
import _SkeletonShape from './SkeletonShape.vue';
import _SkeletonLine from './SkeletonLine.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type SkeletonInstance = InstanceType<typeof _Skeleton>;
export type SkeletonShapeInstance = InstanceType<typeof _SkeletonShape>;
export type SkeletonLineInstance = InstanceType<typeof _SkeletonLine>;
export type {
  SkeletonProps,
  SkeletonShapeProps,
  SkeletonLineProps,
} from './type';

const Skeleton = Object.assign(_Skeleton, {
  shape: _SkeletonShape,
  line: _SkeletonLine,
  install: (app: App) => {
    app.component(getComponentPrefix() + _Skeleton.name, _Skeleton);
    app.component(getComponentPrefix() + _SkeletonShape.name, _SkeletonShape);
    app.component(getComponentPrefix() + _SkeletonLine.name, _SkeletonLine);
  },
});
export { _SkeletonShape as SkeletonShape, _SkeletonLine as SkeletonLine };

declare module 'vue' {
  export interface GlobalComponents {
    YcSkeleton: typeof Skeleton;
    YcSkeletonShape: typeof _SkeletonShape;
    YcSkeletonLine: typeof _SkeletonLine;
  }
}

export default Skeleton;
