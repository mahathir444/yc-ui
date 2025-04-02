import { WritableComputedRef, Ref, ComputedRef } from 'vue';
export interface ProvideType {
  computedValue: WritableComputedRef<string> | Ref<string>;
  baseColor: Ref<string>;
  opacity: Ref<number>;
  format: WritableComputedRef<'hex' | 'rgb'> | Ref<'hex' | 'rgb'>;
}
