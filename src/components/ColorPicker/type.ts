import { WritableComputedRef, Ref, ComputedRef } from 'vue';
export interface ProvideType {
  computedValue: WritableComputedRef<string> | Ref<string>;
  baseColor: Ref<string>;
  alpha: Ref<number>;
  popupVisible: Ref<boolean>;
  format: WritableComputedRef<'hex' | 'rgb'> | Ref<'hex' | 'rgb'>;
}
