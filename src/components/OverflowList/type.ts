import { TagProps } from '@/components/Tag';

import { Ref } from 'vue';
export interface OverflowListProps {
  min?: number;
  margin?: number;
  from?: 'start' | 'end';
  extraTagProps?: TagProps;
}

export interface ProvideType {
  min: Ref<number>;
  tagNumber: Ref<number>;
}
