import { RenderFunction, VNode } from 'vue';

export interface UploadProps {
  fileList?: FileItem[];
  defaultList?: FileItem[];
  accept?: string;
  action?: string;
  disabled?: boolean;
  multiple?: boolean;
  directory?: boolean;
  draggable?: boolean;
  tip?: string;
  headers?: Record<string, string>;
  data?:
    | Record<string, string | Blob>
    | ((fileItem: FileItem) => Record<string, string | Blob>);
  name?: string | ((fileItem: FileItem) => string);
  withCredentials?: boolean;
  customRequest?: (option: RequestOption) => UploadRequest;
  limit?: number;
  autoUpload?: Boolean;
  showFileList?: boolean;
  showRemoveButton?: boolean;
  showRetryButton?: boolean;
  showCancelButton?: boolean;
  showUploadButton?: boolean | { showOnExceedLimit: boolean };
  showPreviewButton?: boolean;
  download?: boolean;
  showLink?: boolean;
  imageLoading?: 'eager' | 'lazy';
  listType?: 'text' | 'picture' | 'picture-card';
  responseUrlKey?: string | ((fileItem: FileItem) => string);
  customIcon?: CustomIcon;
  imagePreview?: boolean;
  onBeforeUpload?: (file: File) => boolean | Promise<boolean | File>;
  onBeforeRemove?: (fileItem: FileItem) => Promise<boolean>;
  onButtonClick?: (event: Event) => Promise<FileList> | void;
}

export interface UploadEmits {}

export interface UploadSlots {
  ['extra-button'](params: { fileItem: FileItem }): void;
  image(params: { fileItem: FileItem }): void;
  ['file-name'](): void;
  ['file-icon'](): void;
  ['remove-icon'](): void;
  ['preview-icon'](): void;
  ['cancel-icon'](): void;
  ['start-icon'](): void;
  ['error-icon'](): void;
  ['success-icon'](): void;
  ['retry-icon'](): void;
  ['upload-button'](): void;
  ['upload-item'](params: { fileItem: FileItem; index: number }): void;
}

export interface UploadExpose {
  submit(fileItem: FileItem): void;
  abort(fileItem: FileItem): void;
  updateFile(id: number, file: File): void;
  upload(files: File[]): void;
}

export interface FileItem {
  uid: string;
  status?: FileStatus;
  file?: File;
  percent?: number;
  response?: any;
  url?: string;
  name?: string;
}

export type FileStatus = 'init' | 'uploading' | 'done' | 'error';

export interface CustomIcon {
  startIcon?: RenderFunction;
  cancelIcon?: RenderFunction;
  retryIcon?: RenderFunction;
  successIcon?: RenderFunction;
  errorIcon?: RenderFunction;
  removeIcon?: RenderFunction;
  previewIcon?: RenderFunction;
  fileIcon?: (fileItem: FileItem) => VNode;
  fileName?: (fileItem: FileItem) => string | VNode;
}

export interface RequestOption {
  action: string;
  headers: Record<string, string>;
  name: string | ((fileItem: FileItem) => string);
  fileItem: FileItem;
  data:
    | Record<string, string | Blob>
    | ((fileItem: FileItem) => Record<string, string | Blob>);
  withCredentials: boolean;
  onProgress: (percent: number, event?: ProgressEvent) => void;
  onSuccess: (response?: any) => void;
  onError: (response?: any) => void;
}

export interface UploadRequest {
  abort: () => void;
}
