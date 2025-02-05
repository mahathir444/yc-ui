import dayjs from 'dayjs';

//获取时间错
export const getTimeStap = () => {
  return new Date().getTime();
};

//格式化事件
export const formatTime = (
  date: string | number,
  template: string = 'YYYY-MM-DD HH:mm:ss'
) => {
  return dayjs(date).format(template);
};

//睡眠函数
export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
};

//计算文件大小
export const calFileSize = (size: number) => {
  let count = 0;
  const sizeMap: Record<string, string> = {
    0: 'Byte',
    1: 'KB',
    2: 'MB',
    3: 'GB',
  };
  while (size / 1024 >= 1) {
    size /= 1024;
    count++;
  }
  return size.toFixed(2) + ' ' + sizeMap[count];
};

//获取文件后缀
export const getFileExt = (filename: string) => {
  return filename.split('.').at(-1);
};
