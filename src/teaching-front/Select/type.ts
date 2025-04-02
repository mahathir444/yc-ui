import {
  SelectOptionData,
  SelectOptionGroup,
  SelectProps as _SelectProps,
} from '@arco-design/web-vue';

export type SelectProps = _SelectProps & {
  prefixText?: string;
  scrollbar?: boolean;
  unmountonClose?: boolean;
  defaultActivefirstOption?: boolean;
};

export type SelectValue =
  | (string | number | boolean | Record<string, any>)
  | (string | number | boolean | Record<string, any>)[];

export type FilterOption = (
  inputValue: string,
  option: SelectOptionData
) => boolean;

export type FallbackOption = (value: SelectValue) => SelectOptionData;

export type FormatLabel = (data: SelectOptionData) => string;

export type SelectOptions = (
  | string
  | number
  | boolean
  | SelectOptionData
  | SelectOptionGroup
)[];
