import dayjs from 'dayjs';

type Task = (...args: any) => Promise<any>;

//格式化事件
export const formatTime = (
  date: string | number | Date,
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

export const taskRunner = async (tasks: Task[], max: number) => {
  let index = 0;
  const results = new Array(tasks.length);
  const executing: Promise<any>[] = [];
  const runTask = async () => {
    if (index === tasks.length) {
      return;
    }
    const taskIndex = index++;
    const task = tasks[taskIndex] as Task;
    const p = task()
      .then((result) => {
        results[taskIndex] = result;
        executing.splice(executing.indexOf(p), 1);
      })
      .catch((error) => {
        results[taskIndex] = error;
        executing.splice(executing.indexOf(p), 1);
      });
    executing.push(p);
    let r = Promise.resolve();
    if (executing.length >= max) {
      r = Promise.race(executing);
    }
    await r;
    await runTask();
  };
  await runTask();
  await Promise.all(executing);
  return results;
};

// 图像压缩
export const compressImage = (
  file: File,
  quality: number,
  maxWidth: number = 7680,
  maxHeight: number = 4320
): Promise<File> => {
  // 小于1mb不进行压缩
  if (file.size < 1024 * 900) return Promise.resolve(file);
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      return reject(new Error('Failed to get canvas 2D context.'));
    }
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.src = url;
    image.onload = () => {
      let targetWidth = image.width;
      let targetHeight = image.height;
      if (targetWidth > maxWidth || targetHeight > maxHeight) {
        const ratio = Math.min(
          maxWidth / targetWidth,
          maxHeight / targetHeight
        );
        targetWidth *= ratio;
        targetHeight *= ratio;
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      context.clearRect(0, 0, targetWidth, targetHeight);
      context.drawImage(image, 0, 0, targetWidth, targetHeight);
      canvas.toBlob(
        (blob) => {
          console.log(blob);
          const compressFile = new File([blob as Blob], file.name, {
            type: file.type,
          });
          URL.revokeObjectURL(url);
          resolve(compressFile as File);
        },
        file.type,
        quality
      );
    };

    image.onerror = (err) => {
      reject(err);
    };
  });
};
