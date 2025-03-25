import dayjs from 'dayjs';

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
